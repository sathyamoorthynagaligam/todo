import { ConsumerService } from './consumer.service';
import { AuthService } from 'src/auth/auth.service';
export declare class ConsumerController {
    private readonly consumerService;
    private readonly authService;
    constructor(consumerService: ConsumerService, authService: AuthService);
    getProfile(req: any): any;
}
