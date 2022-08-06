import { Module } from '@nestjs/common';
import { databaseModule } from '../database';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  imports: [databaseModule],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
