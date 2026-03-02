import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';


export default (config: ConfigService): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DATABASE'),
        synchronize: true,//false in prod ,run migration in prod
        logging: true,
        autoLoadEntities: true,
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        extra: {
            max: config.get<number>('DB_POOL_SIZE'),
        },
    };
};