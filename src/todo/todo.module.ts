import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todos } from "src/database/todos.entity";
import { TodosController } from "./todo.controller";
import { Consumer } from "src/database/consumer.entity";
import { AuthModule } from "src/auth/auth.module";
import { TodosService } from "./todo.service";





@Module({
  imports: [TypeOrmModule.forFeature([Consumer, Todos]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TypeOrmModule, TodosService]
})
export class TodoModule { }
