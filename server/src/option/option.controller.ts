import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OptionService } from './option.service';

@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async getAllOptions() {
    const options = await this.optionService.getAllOptions();

    return {
      statusCode: HttpStatus.OK,
      data: options,
    };
  }
}
