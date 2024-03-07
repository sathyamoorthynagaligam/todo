import {
  BadRequestException, Body, Controller,
  HttpCode,
  ForbiddenException, Query, Delete, Get, Res, Put, Param, Post, Request, UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response, query } from 'express';
import { TodosService } from "./todo.service";
import { AuthGuard } from "@nestjs/passport";




@Controller('api/todos')
export class TodosController {

  constructor(
    private readonly todosService: TodosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodos(@Body() payload: any, @Request() req) {


    if (!payload.title || !payload.description) {
      throw new BadRequestException('Missing Parameters');
    } 
    else {
      return this.todosService.createTodos(payload, req.user.id);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodos(@Request() req, @Query('status') status: string, @Query('searchText') searchText: string, @Query('sort') sort: string, @Query('limit') limit: number, @Query('page') pageNumber: number) {

    const consumerId = req.user.id;

    const todos = await this.todosService.getAllTodos(consumerId, status, searchText, sort, limit, pageNumber);
    return todos;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodoId(@Param('id') id: string, @Request() req) {
    console.log(id);
    


    const todo = await this.todosService.getTodoId(id, req.user.id);
    if (!todo) {
      throw new ForbiddenException('Consumer not found');
    } else {
      return todo
    }

  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTodos(@Param('id') id: string, @Body() payload: string, @Request() req) {
    console.log(id);
    
    const updateTodo = await this.todosService.updateTodos(id, payload, req.user.id);
    console.log(updateTodo);

    if (!updateTodo) {
      throw new ForbiddenException('Forbidden error');
    } else {
      return updateTodo;
    }
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  async updateTodosStatus(@Param('id') id: string, @Body() payload: any, @Request() req) {

    const updateTodo = await this.todosService.updateTodosStatus(id, payload, req.user.id);
    //  console.log(updateTodo);

    if (!updateTodo) {
      throw new ForbiddenException('Forbidden error');
    }
    else {
      return updateTodo;
    }
  }



  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTodos(@Param('id') id: string, @Request() req) {
    const result = await this.todosService.deleteTodos(id, req.user.id);

  }

}

