import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from 'src/database/todos.entity';
import { CreateCustomerDto } from 'src/database/customerDto';
export declare class AuthService {
    private consumerRepository;
    private todosRepository;
    private jwtService;
    constructor(consumerRepository: Repository<Consumer>, todosRepository: Repository<Todos>, jwtService: JwtService);
    findOne(email: string): Promise<Consumer | null>;
    validateUser(email: string, pass: string): Promise<any>;
    logIn(consumer: Consumer): Promise<{
        access_token: string;
    }>;
    signUp(consumer: CreateCustomerDto): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        todos: Todos[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
