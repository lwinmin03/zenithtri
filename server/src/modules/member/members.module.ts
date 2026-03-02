import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "src/entity/member.entity";
import { MembersService } from "./members.service";
import { MembersController } from "./members.controlller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Member])
    ],
    exports: [
        MembersService
    ],
    controllers: [MembersController],
    providers: [MembersService]
})

export class MembersModule { }