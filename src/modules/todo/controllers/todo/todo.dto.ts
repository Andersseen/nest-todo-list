import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Name of todo',
    type: String,
  })
  name: string;

  @ApiProperty({ required: false })
  isCompleted?: boolean;
}

export class UpdateTodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Name of todo',
    type: String,
  })
  name: string;

  @ApiProperty({ required: false })
  @ApiProperty({
    description: "It's done?",
    required: false,
    type: Boolean,
    default: false,
  })
  isCompleted?: boolean;
}
