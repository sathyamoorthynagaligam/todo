import { Todos } from './todos.entity';
export declare class Consumer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    todos: Todos[];
    createdAt: Date;
    updatedAt: Date;
}
