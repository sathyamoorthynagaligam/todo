import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from 'src/database/todos.entity';
import { CreateCustomerDto } from 'src/database/customerDto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(Consumer)
    private consumerRepository: Repository<Consumer>,
        @InjectRepository(Todos)
        private todosRepository: Repository<Todos>,
        private jwtService: JwtService
    ) { }

    async findOne(email: string): Promise<Consumer | null> {
        return this.consumerRepository.findOne({ where: { email: email } });
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.consumerRepository.findOne({ where: { email: email } })
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if (match) {
                const { password, ...result } = user
                return result;
            } else {
                return null;
            }
        }
        return null;
    }

    async logIn(consumer: Consumer) {
        const data = await this.findOne(consumer.email);


        const payload = {
            sub: data.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        };


        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    async signUp(consumer: CreateCustomerDto) {

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(consumer.password, saltRounds);

        let userObj = new Consumer();
        userObj.firstname = consumer.firstName;
        userObj.lastname = consumer.lastName;
        userObj.email = consumer.email;
        userObj.password = passwordHash;

        await this.consumerRepository.save(userObj)

        const { password, ...result } = userObj
        return result
    }


}
