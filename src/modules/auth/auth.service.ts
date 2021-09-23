import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';
import { IAppConfig } from '@src/configs/app.config';
import { IAuthConfig } from '@src/configs/auth.config';
import { AUTH_MESSAGE } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IAppConfig & IAuthConfig>,
  ) {}

  async register(registerDto: CreateUserDto): Promise<RegisterResponseDto> {
    if (!!(await this.usersService.findWithEmail(registerDto.email))) {
      throw new BadRequestException(AUTH_MESSAGE.EMAIL_EXIST_ERROR);
    }

    registerDto.password = bcrypt.hashSync(
      registerDto.password,
      this.configService.get('bcryptSalt'),
    );

    let user = await this.usersService.create(registerDto);
    user = await this.usersService.findWithOmittedPassword(user._id);
    return {
      token: this._generateToken(user._id, false),
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findWithEmail(loginDto.email);
    const omittedPasswordUser = await this.usersService.findWithOmittedPassword(user._id);
    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new HttpException(
        { statusCode: HttpStatus.UNAUTHORIZED, message: AUTH_MESSAGE.WRONG_LOGIN_ERROR },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      token: this._generateToken(user._id, loginDto.remember),
      user: omittedPasswordUser,
    };
  }

  private _generateToken(userId: ObjectId, isLongExpires: boolean): string {
    return this.jwtService.sign(
      { userId },
      {
        expiresIn: isLongExpires
          ? this.configService.get('jwtLongExpiresIn')
          : this.configService.get('jwtShortExpiresIn'),
      },
    );
  }
}
