import { SizeOption } from 'src/entity/size.entity';

export class SizeDto {
  constructor(
    private readonly id: number,
    private readonly s: number | null,
    private readonly m: number | null,
    private readonly l: number | null,
  ) {}

  getId() {
    return this.id;
  }

  static fromSizeEntity(size: SizeOption) {
    return new SizeDto(size.foodId, size.small, size.medium, size.large);
  }
}
