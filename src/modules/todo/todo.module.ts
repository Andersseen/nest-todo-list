import { Todo } from './entities/todo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],

  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
