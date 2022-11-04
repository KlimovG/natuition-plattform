import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class User {
  @IsNotEmpty()
  id!: number;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone?: string;
}
