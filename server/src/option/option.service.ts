import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OptionDto } from 'src/dto/option.dto';
import { SizeOption } from 'src/entity/size.entity';
import { TemperatureOption } from 'src/entity/temperature.entity';
import { SizeDto } from 'src/dto/size.dto';
import { TemperatureDto } from 'src/dto/temperature.dto';

@Injectable()
export class OptionService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async getAllOptions(): Promise<OptionDto> {
    const sizeEntities = await this.dataSource.manager.find(SizeOption);
    const sizeDtos = sizeEntities.map(SizeDto.fromSizeEntity);
    const temperatureEntities = await this.dataSource.manager.find(TemperatureOption);
    const temperatureDtos = temperatureEntities.map(TemperatureDto.fromTemperatureEntity);

    return OptionDto.fromDtos(sizeDtos, temperatureDtos);
  }
}
