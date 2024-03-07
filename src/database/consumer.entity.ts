
import { Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Todos } from './todos.entity';



@Entity("consumer")
export class Consumer {
  @PrimaryGeneratedColumn('uuid',{ name: 'id' })
  id: number;

  @Column({ name: 'firstname' })
  firstname: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'email' })
  @Unique(['email'])
  email: string;

  @Column({ name: 'password' })
  password: string;

  
  @OneToMany(() => Todos, (todos) => todos.consumer)
  @JoinColumn({name:'consumer_id'})
  todos: Todos[]


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

}