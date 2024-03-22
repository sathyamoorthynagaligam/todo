import { Consumer } from "src/database/consumer.entity";
import { Todos } from "src/database/todos.entity";
import { Repository } from "typeorm";
export declare class TodosService {
    private consumerRepository;
    private todosRepository;
    constructor(consumerRepository: Repository<Consumer>, todosRepository: Repository<Todos>);
    getAllTodos(consumerId: any, status: any, searchText: any, sort: any, limit: any, pageNumber: any): Promise<{
        count: number;
        todo: Todos[];
    }>;
    createTodos(consumer: any, data: any): Promise<Todos>;
    getTodoId(id: any, consumerId: any): Promise<Todos>;
    updateTodos(id: any, consumer: any, consumerId: any): Promise<Todos>;
    updateTodosStatus(id: any, consumer: any, consumerId: any): Promise<Todos>;
    deleteTodos(id: any, consumerId: any): Promise<{
        statusCode: number;
    }>;
}
