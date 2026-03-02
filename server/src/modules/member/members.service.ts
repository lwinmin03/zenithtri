import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from 'src/dto/create-member.dto';
import { FilterMemberDto } from 'src/dto/filter-member.dto';
import { UpdateMemberDto } from 'src/dto/update-member.dto';
import { Member, MemberStatus } from 'src/entity/member.entity';
import { Repository, Brackets } from 'typeorm';


@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private readonly membersRepository: Repository<Member>,
    ) { }

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        // Check for unique Insurance ID
        const existingMember = await this.membersRepository.findOne({
            where: { insuranceId: createMemberDto.insuranceId },
        });

        if (existingMember) {
            throw new ConflictException('A member with this Insurance ID already exists');
        }

        const member = this.membersRepository.create(createMemberDto);
        return await this.membersRepository.save(member);
    }

    async findAll(filterDto: FilterMemberDto) {
        const { search, page = 1, limit = 10 } = filterDto;
        const skip = (page - 1) * limit;

        const query = this.membersRepository.createQueryBuilder('member');

        if (search) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('member.firstName ILIKE :search', { search: `%${search}%` })
                        .orWhere('member.lastName ILIKE :search', { search: `%${search}%` })
                        .orWhere('member.insuranceId ILIKE :search', { search: `%${search}%` });
                }),
            );
        }


        query.andWhere('member.status = :status', { status: MemberStatus.ACTIVE });

        query.skip(skip).take(limit);
        query.orderBy('member.createdAt', 'DESC');

        const [data, totalItems] = await query.getManyAndCount();


        return {
            payload: data,
            pagination: {
                hasNextPage: skip + limit < totalItems,
                hasPreviousPage: page > 1,
                pageSize: limit,
                totalItems: totalItems,
            }
        };
    }

    async findOne(id: string): Promise<Member> {
        const member = await this.membersRepository.findOne({ where: { id } });
        if (!member) {
            throw new NotFoundException(`Member with ID "${id}" not found`);
        }
        return member;
    }

    async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
        const member = await this.findOne(id); // Ensures member exists

        // If updating insuranceId, verify it doesn't conflict with another record
        if (updateMemberDto.insuranceId && updateMemberDto.insuranceId !== member.insuranceId) {
            const existing = await this.membersRepository.findOne({
                where: { insuranceId: updateMemberDto.insuranceId },
            });
            if (existing) {
                throw new ConflictException('Insurance ID is already in use by another member');
            }
        }

        Object.assign(member, updateMemberDto);
        return await this.membersRepository.save(member);
    }

    async remove(id: string): Promise<Member> {
        const member = await this.findOne(id);

        //Soft Delete implementation
        member.status = MemberStatus.INACTIVE;
        return await this.membersRepository.save(member);
    }
}