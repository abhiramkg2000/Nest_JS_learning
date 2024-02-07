import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Client } from 'pg';

const client = new Client({
  database: 'todo_data',
  user: 'todo_user',
  password: 'todo_user',
});

client.connect();

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    const maxId = (await client.query('SELECT MAX(todo_id) FROM todos')).rows[0].max;
    // console.log((await client.query('SELECT MAX(todo_id) FROM todos')).rows[0].max);
    await client.query('INSERT INTO todos VALUES ($1,$2,$3)', [
      maxId + 1,
      createTodoDto.todo_desc,
      false,
    ]);
    const result = await client.query('SELECT * FROM todos');
    return result.rows.sort((a, b) => a.todo_id - b.todo_id);
    // return `This action inserts a #${rowCount + 1} todo`;
  }

  async findAll() {
    const result = await client.query('SELECT * FROM todos');
    return result.rows.sort((a, b) => a.todo_id - b.todo_id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    // console.log({updateTodoDto});
    await client.query(
      'UPDATE todos SET todo_desc=$2,todo_completed=$3 WHERE todo_id=$1',
      [id, updateTodoDto.todo_desc, updateTodoDto.todo_completed],
    );
    // console.log('desc');
    const result = await client.query('SELECT * FROM todos');
    return result.rows.sort((a, b) => a.todo_id - b.todo_id);
    // return `This action updates a #${id} todo`;
  }

  async remove(id: number) {
    await client.query('DELETE FROM todos WHERE todo_id=$1', [id]);
    // return `This action removes a #${id} todo`;
    const result = await client.query('SELECT * FROM todos');
    return result.rows.sort((a, b) => a.todo_id - b.todo_id);
  }
}
