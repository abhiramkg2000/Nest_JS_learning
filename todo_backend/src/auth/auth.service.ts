import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Client } from 'pg';
import { JwtService } from '@nestjs/jwt';

const client = new Client({
  database: 'todo_data',
  user: 'todo_user',
  password: 'todo_user',
});

client.connect();

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}
  async register(userDto: UserDto) {
    const maxId = (await client.query('SELECT MAX(user_id) FROM users')).rows[0]
      .max;
    // console.log((await client.query('SELECT MAX(todo_id) FROM todos')).rows[0].max);
    await client.query('INSERT INTO users VALUES ($1,$2,$3)', [
      maxId + 1,
      userDto.user_name,
      userDto.password,
    ]);
    const result = await client.query(
      'SELECT user_id,user_name,password FROM users WHERE user_id=$1',
      [maxId + 1],
    );

    const { password, ...user_details } = result.rows[0];

    return user_details;
  }

  async login(userDto: UserDto) {
    const result = await client.query(
      'SELECT user_id,user_name,password FROM users WHERE user_name=$1 AND password=$2',
      [userDto.user_name, userDto.password],
    );
    if (!result.rows[0]) {
      throw new UnauthorizedException({
        message: 'user not found',
        statusCode: 401,
      });
    }

    const { password, user_id, ...user_details } = result.rows[0];
    const access_token = this.jwtService.sign(userDto);
    const refresh_token = this.jwtService.sign(userDto, { expiresIn: '60s' });
    // console.log((this.jwtService.verify(access_token)).exp)
    await client.query('UPDATE users SET refresh_token=$1 WHERE user_name=$2', [
      refresh_token,
      userDto.user_name,
    ]);
    return { ...user_details, access_token, refresh_token };
    // return `This action inserts a #${rowCount + 1} todo`;
  }
  async refresh(user_name: string, password: string, refresh_token: string) {
    const result = await client.query(
      'SELECT refresh_token FROM users WHERE user_name=$1',
      [user_name],
    );
    try {
      this.jwtService.verify(refresh_token, {
        secret: 'secret',
      });
    } catch {
      throw new UnauthorizedException("refresh token expired");
    }

    const access_token = this.jwtService.sign({ user_name, password });

    return { access_token };
  }
}
