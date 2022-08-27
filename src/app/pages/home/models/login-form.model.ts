import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginFormOutput {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export type LoginFormOutputType = typeof LoginFormOutput;
