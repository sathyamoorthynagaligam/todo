import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { skip } from "rxjs";
import { Consumer } from "src/database/consumer.entity";
import { Todos } from "src/database/todos.entity";
import { Like, Repository } from "typeorm";







@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Consumer)
    private consumerRepository: Repository<Consumer>,
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>) { }


  async getAllTodos(consumerId,status,searchText,sort,limit,pageNumber) {
   
    // if (!['not started', 'in progress', 'completed'].includes(status)) {
    //   throw new BadRequestException('Invalid status parameter. Valid values are "not started", "started at", or "completed".');
    // }
    if(pageNumber == 0){
      throw new BadRequestException('Page number must be greater than zero');
    }
   
    const skip= (pageNumber-1)*(limit||0)
    // console.log(skip);
    
   


    const todo= await this.todosRepository.find({
       where:
        { consumer: { id: consumerId },
        status:status,
        title: Like(`%${searchText || ''}%`) },
         order:{updatedAt:sort||"ASC"}, 
         take:limit,
         skip:skip||0
        })
    // console.log(todo);
    

    return {count:todo.length, todo:todo};
  }


  async createTodos(consumer, data) {
   
    let todosObj = new Todos();
   
    todosObj.title = consumer.title;
    todosObj.description = consumer.description;

    const startAt = new Date(consumer.startAt);
   
        
    if (isNaN(startAt.getTime())) {
      console.log(isNaN(startAt.getTime()));
      
      throw new BadRequestException("startAt has an invalid date format");
    }

   
    
    const completeBy = new Date(consumer.completeBy);
    if (isNaN(completeBy.getTime())) {
      throw new BadRequestException("completeBy has an invalid date format");
    }

   if(consumer.startAt==""){
throw new BadRequestException(" empty string cannot be accepted")
    }else if(consumer.startAt==null){
   todosObj.startAt=consumer.startAt
    }else
    {
      todosObj.startAt= consumer.startAt ;
    }
    if(consumer.completeBy==""){
      throw new BadRequestException(" empty string cannot be accepted")
          }else if(consumer.completeBy==null){
         todosObj.completeBy=consumer.completeBy
          }else {
            todosObj.completeBy= consumer.completeBy ;
          }
    todosObj.consumer = data
    await this.todosRepository.save(todosObj)
    return todosObj
  }


  async getTodoId(id, consumerId) {

    let todo = await this.todosRepository.find({
      where: {
        id: id,
        consumer: { id: consumerId }
      },
      relations: ['consumer']
    })
    if (!todo) {
      throw new ForbiddenException('Consumer is not found');
    } else {
      // console.log(todo[0]);
      return todo[0];
    }
  }

  async updateTodos(id, consumer, consumerId) {
    const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
    // console.log(todosObj);

    if (!todosObj) {
      throw new ForbiddenException('Consumer not found');
    }
    todosObj.title = consumer.title;
    todosObj.description = consumer.description;
    
    await this.todosRepository.save(todosObj);

    const updatedObj = await this.todosRepository.findOneBy({ id });
    // console.log(updatedObj);

    return updatedObj;
  }


  async updateTodosStatus(id, consumer, consumerId) {
    const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
    // console.log(todosObj);

    if (!todosObj) {
      throw new ForbiddenException('Consumer not found');
    }

    if (consumer.status === 'not started' || consumer.status === 'in progress' || consumer.status === 'completed') {
      todosObj.status = consumer.status;

      await this.todosRepository.save(todosObj);

      const updatedObj = await this.todosRepository.findOneBy({ id });
      // console.log(updatedObj);

      return updatedObj;
    } else {
      throw new ForbiddenException('Status must be: not started or in progress or completed');
    }

  }




  async deleteTodos(id, consumerId) {
    const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
    // console.log(todosObj);

    if (!todosObj) {
      throw new ForbiddenException('Consumer not found');
    }

    const deletedObj = await this.todosRepository.delete(id);
    return { statusCode: 204 };

  }

 

}



