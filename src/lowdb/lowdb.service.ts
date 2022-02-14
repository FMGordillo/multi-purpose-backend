import * as uuid from 'uuid';
import type StormDB from 'stormdb';
import { Injectable } from '@nestjs/common';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

/**
 * TODO: Add collections support
 */
@Injectable()
export class StormDbService {
  private db: StormDB;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    // @ts-ignore
    const StormDB = require('stormdb');
    try {
      const engine = new StormDB.localFileEngine('../db.stormdb');
      this.db = new StormDB(engine);
      await this.populateDatabase();
    } catch (error) {
      console.log('error while initializing database', error);
    }
  }

  private async populateDatabase() {
    this.db.default({ todos: [] });
  }

  async find(id: string) {
    const todos = this.db.get('data') as unknown as Todo[];
    const todo = todos.find((t) => t.id === id);
    return todo;
  }

  async findAll() {
    return this.db.get('todos').value() as unknown as Todo[];
  }

  async add({ id, done, text }: Omit<Todo, 'id'> & Partial<Todo>) {
    if (id) {
      console.info("You don't need an ID. Omitting...");
    }

    const _data: Todo = {
      id: uuid.v4(),
      done: done !== undefined ? done : false,
      text: text || '',
    };
    const todos = await this.findAll();
    // @ts-ignore
    todos.push(_data).save();
  }

  async update(data: Required<Pick<Todo, 'id'>> & Partial<Todo>) {
    const todos = await this.findAll();
    const currentTodo = todos.find((t) => t.id === data.id);
    if (!currentTodo) {
      throw new Error('No match with the current ID');
    }

    const newTodos = todos.map((t) => {
      if (t.id === currentTodo.id) return { ...currentTodo, ...data };
      else return t;
    });

    // @ts-ignore
    this.db.get('todos').setValue(newTodos);
    this.db.save();

    return currentTodo;
  }
}
