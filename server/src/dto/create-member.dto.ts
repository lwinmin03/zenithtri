import { IsString, IsNotEmpty, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { MemberStatus } from 'src/entity/member.entity';


export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    insuranceId: string;

    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: string; // Stored as YYYY-MM-DD

    @IsEnum(MemberStatus)
    @IsOptional()
    status?: MemberStatus;
}