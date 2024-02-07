import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
  UseGuards
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()

export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Get()
  // @Header("ngrok-skip-browser-warning","");
  findAll(@Request() req:any) {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }
  // completed(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todosService.completed(+id, updateTodoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
