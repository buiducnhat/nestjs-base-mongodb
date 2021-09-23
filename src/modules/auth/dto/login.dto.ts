import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserInfoDto } from './user-info.dto';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}

export class LoginResponseDto {
  token: string;
  user: UserInfoDto;
}
