import { TodosService } from "./todo.service";
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    createTodos(payload: any, req: any): Promise<import("../database/todos.entity").Todos>;
    getAllTodos(req: any, status: string, searchText: string, sort: string, limit: number, pageNumber: number): Promise<{
        count: number;
        todo: import("../database/todos.entity").Todos[];
    }>;
    getTodoId(id: string, req: any): Promise<import("../database/todos.entity").Todos>;
    updateTodos(id: string, payload: string, req: any): Promise<import("../database/todos.entity").Todos>;
    updateTodosStatus(id: string, payload: any, req: any): Promise<import("../database/todos.entity").Todos>;
    deleteTodos(id: string, req: any): Promise<void>;
}
