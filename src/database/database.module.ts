import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from './todos.entity';



@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Consumer, Todos],
    synchronize: true,
    autoLoadEntities: true,

  })],
  controllers: [],
  providers: [],
})
export class DatabaseModule { }
