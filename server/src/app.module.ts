import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import dbConfig from './config/db.config';
import { MembersModule } from './modules/member/members.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      validate,

    }),


    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig, // This correctly injects ConfigService into your function
    }),

    MembersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
