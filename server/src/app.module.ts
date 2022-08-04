import { Module } from '@nestjs/common';
import { databaseModule } from './database';

@Module({
  imports: [databaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
