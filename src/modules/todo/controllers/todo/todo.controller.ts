import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('rest/api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodoActions(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOneByIDActions(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException(
        'Todo with id =' + id + 'not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  @Post()
  createTodoActions(@Body() createDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.name = createDto.name;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodoActions(
    @Param('id') id: string,
    @Body() name: string,
    isCompleted: boolean,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id =' + id + 'not exists');
    }
    todo.name = name;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodoActions(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
