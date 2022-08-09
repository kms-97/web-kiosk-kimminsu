import { TemperatureOption } from 'src/entity/temperature.entity';

export class TemperatureDto {
  constructor(
    private readonly id: number,
    private readonly h: number | null,
    private readonly c: number | null,
  ) {}

  getId() {
    return this.id;
  }

  static fromTemperatureEntity(temperature: TemperatureOption) {
    return new TemperatureDto(temperature.foodId, temperature.hot, temperature.cool);
  }
}
