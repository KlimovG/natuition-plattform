import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginOutput {
  @IsNotEmpty()
  @IsEmail()
  token!: string;

  @IsNotEmpty()
  id!: number;
}
