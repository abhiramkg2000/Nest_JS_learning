import { IsString } from 'class-validator';

export class CreateTodoDto {
  // @IsString({message:"todo_desc must be a string"})
  @IsString()
  todo_desc: string;
}
