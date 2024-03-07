import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from '../database/consumer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Todos } from 'src/database/todos.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Consumer, Todos]),AuthModule],
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports:[TypeOrmModule, ConsumerService]
})
export class ConsumerModule {}
