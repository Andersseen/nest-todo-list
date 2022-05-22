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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { NotFound } from './type';

@ApiTags('todo')
@Controller('rest/api')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all todos',
    type: [Todo],
  })
  getTodoActions(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get one todo',
    type: Todo,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFound,
  })
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
  @ApiResponse({
    status: 200,
    description: 'create one todo',
    type: Todo,
  })
  @ApiBody({ type: CreateTodoDto })
  createTodoActions(@Body() createDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.name = createDto.name;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'update todo',
    type: Todo,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFound,
  })
  @ApiBody({ type: UpdateTodoDto })
  async updateTodoActions(
    @Param('id') id: string,
    @Body() updateDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id =' + id + 'not exists');
    }
    todo.name = updateDto.name;
    todo.isCompleted = updateDto.isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete one todo',
    type: Todo,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFound,
  })
  async deleteTodoActions(@Param('id') id: string): Promise<void> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id =' + id + 'not exists');
    }
    return this.todoService.remove(id);
  }
}
