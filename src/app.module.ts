import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StormDbService } from './stormdb/stormdb.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [StormDbService],
})
export class AppModule {}
