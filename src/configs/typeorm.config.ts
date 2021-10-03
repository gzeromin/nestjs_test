import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import key from '../configs/key';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: key.POSTGRES_PASSWORD,
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}