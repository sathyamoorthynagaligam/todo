import { AuthService } from './auth.service';
import { CreateCustomerDto } from 'src/database/customerDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(user: CreateCustomerDto): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        todos: import("../database/todos.entity").Todos[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    logIn(user: any): Promise<any>;
}
