import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '@modules/auth/dto/jwt-payload.dto';
import { IAuthConfig } from '@src/configs/auth.config';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService<IAuthConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwtSecretKey'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findWithOmittedPassword(payload.userId);

    if (!user || payload.exp <= payload.iat) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
