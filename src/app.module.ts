import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StormDbService } from './lowdb/lowdb.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StormDbService],
})
export class AppModule {}
