import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Consumer } from 'src/database/consumer.entity';
import { Todos } from 'src/database/todos.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Consumer,Todos]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }),
    PassportModule
  ],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
