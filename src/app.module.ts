import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { ConsumerModule } from './consumer/consumer.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule,ConsumerModule,AuthModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
