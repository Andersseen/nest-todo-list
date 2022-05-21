import { Todo } from './entities/todo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],

  controllers: [],
  providers: [],
})
export class TodoModule {}
