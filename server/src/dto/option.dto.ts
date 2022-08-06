import { SizeDto } from './size.dto';
import { TemperatureDto } from './temperature.dto';

export class OptionDto {
  constructor(
    private readonly size: { [key: string]: SizeDto },
    private readonly temperature: { [key: string]: TemperatureDto },
  ) {}

  static fromDtos(sizes: SizeDto[], temperatures: TemperatureDto[]) {
    return new OptionDto(
      sizes.reduce((obj, size) => {
        obj[size.getId()] = size;
        return obj;
      }, {} as { [key: string]: SizeDto }),
      temperatures.reduce((obj, temperature) => {
        obj[temperature.getId()] = temperature;
        return obj;
      }, {} as { [key: string]: TemperatureDto }),
    );
  }
}
