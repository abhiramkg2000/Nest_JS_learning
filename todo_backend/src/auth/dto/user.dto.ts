import { IsString } from 'class-validator';

export class UserDto {
  // @IsString({message:"todo_desc must be a string"})
  @IsString()
  user_name: string;
  @IsString()
  password:string
}
