import { Consumer } from './consumer.entity';
export declare class Todos {
    id: number;
    title: string;
    description: string;
    startAt: Date;
    completeBy: Date;
    consumer: Consumer;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
