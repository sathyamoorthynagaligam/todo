import { Repository } from 'typeorm';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from 'src/database/todos.entity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private consumerRepository;
    private todosRepository;
    constructor(consumerRepository: Repository<Consumer>, todosRepository: Repository<Todos>);
    findOne(email: string): Promise<Consumer | null>;
    validate(user: any): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        todos: Todos[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
