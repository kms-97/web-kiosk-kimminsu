import { SizeOption } from 'src/entity/size.entity';

export class SizeDto {
  constructor(
    private readonly id: number,
    private readonly small: number | null,
    private readonly medium: number | null,
    private readonly large: number | null,
  ) {}

  getId() {
    return this.id;
  }

  static fromSizeEntity(size: SizeOption) {
    return new SizeDto(size.foodId, size.small, size.medium, size.large);
  }
}
