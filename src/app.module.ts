import { TodoModule } from './modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), TodoModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
