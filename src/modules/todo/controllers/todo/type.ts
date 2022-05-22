import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
  @ApiProperty({
    default: 404,
  })
  statusCode: number;

  @ApiProperty({ default: 'Todo with id = % not exists' })
  message: string;
}
