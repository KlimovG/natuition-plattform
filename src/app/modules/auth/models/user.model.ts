import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  id!: number;

  @IsNotEmpty()
  @IsEmail()
  name!: string;
}
