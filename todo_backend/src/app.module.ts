import { Module } from '@nestjs/common';
// Todos
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
// User
import { UserModule } from './auth/auth.module';
import { UserController } from './auth/auth.controller';
import { UserService } from './auth/auth.service';

@Module({
  imports: [TodosModule, UserModule],
  controllers: [TodosController, UserController],
  providers: [TodosService, UserService],
})
export class AppModule {}
