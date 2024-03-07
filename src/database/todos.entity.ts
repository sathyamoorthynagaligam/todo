import { Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Consumer } from './consumer.entity';


@Entity("todos")
export class Todos {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: number;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'start_at', nullable: true })
    startAt: Date;
  
    @Column({ name: 'complete_by', nullable: true })
    completeBy: Date;

    @ManyToOne(() => Consumer, (consumer) => consumer.todos,{lazy:false})
    @JoinColumn({ name: 'consumer_id' })
    consumer: Consumer;

    @Column({name:'status', default:'not started'})
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}