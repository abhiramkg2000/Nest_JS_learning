import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  //   @IsBoolean({message:"todo_completed must be boolean"})
  @IsBoolean()
  todo_completed: boolean;
}
