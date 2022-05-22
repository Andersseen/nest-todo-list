export class CreateTodoDto {
  name: string;
  isCompleted?: boolean;
}

export class UpdateTodoDto {
  id: string;
  name: string;
  isCompleted: boolean;
}
