import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StormDbService } from './stormdb/stormdb.service';
import type { Todo, TodoUpdate } from './stormdb/stormdb.service';

@Controller()
export class AppController {
  constructor(private readonly stormDbService: StormDbService) {}

  @Get('/todos')
  async getTodos() {
    return await this.stormDbService.findAll();
  }

  @Get('/todos/:id')
  async getTodo(@Param('id') id: string) {
    return await this.stormDbService.find(id);
  }

  @Post('/todos')
  async createTodo(@Body() body: Todo) {
    return await this.stormDbService.add(body);
  }

  @Put('/todos/:id')
  async updateTodo(@Param('id') id: string, @Body() body: TodoUpdate) {
    return await this.stormDbService.update({ ...body, id });
  }

  @Delete('/todos/:id')
  async deleteTodo(@Param('id') id: string) {
    throw new Error('Not yet implemented');
  }
}
