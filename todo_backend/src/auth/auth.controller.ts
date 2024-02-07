import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.userService.register(userDto);
  }
  @Post('login')
  login(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Post('refresh')
  refresh(
    @Body('user_name') user_name: string,
    @Body('password') password: string,
    @Body('refresh_token') refresh_token: string,
  ) {
    return this.userService.refresh( user_name, password, refresh_token );
  }
}
