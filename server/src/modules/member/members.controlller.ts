import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { CreateMemberDto } from 'src/dto/create-member.dto';
import { handleRequest } from 'src/lib';
import { MembersService } from './members.service';
import { FilterMemberDto } from 'src/dto/filter-member.dto';
import { UpdateMemberDto } from 'src/dto/update-member.dto';


@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Post()
    create(@Body() createMemberDto: CreateMemberDto) {
        return handleRequest(
            () => this.membersService.create(createMemberDto),
            HttpStatus.CREATED
        );
    }

    @Get()
    findAll(@Query() filterDto: FilterMemberDto) {
        return handleRequest(() => this.membersService.findAll(filterDto));
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return handleRequest(() => this.membersService.findOne(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return handleRequest(() => this.membersService.update(id, updateMemberDto));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return handleRequest(() => this.membersService.remove(id));
    }
}