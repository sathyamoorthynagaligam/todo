import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from 'src/database/todos.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Consumer)
  private consumerRepository: Repository<Consumer>,
  @InjectRepository(Todos)
  private todosRepository: Repository<Todos>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async findOne(email: string): Promise<Consumer | null> {
    return this.consumerRepository.findOne({ where: { email: email} });
  }


  async validate(user) {
    const employee = await this.findOne(user.email);
    // console.log(employee);
    
    if (!employee) {
      throw new UnauthorizedException(' No User ');
    }
    const { password, ...result } = employee
    // console.log(result);
    
    return result
  }


}