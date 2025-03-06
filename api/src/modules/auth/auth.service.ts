import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/models/dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(params: LoginDto) {
    const user = await this.userService.findUserWithPasswordByEmail(
      params.email,
    );

    const result = bcrypt.compareSync(params.password, user.password);

    if (!result) {
      throw new UnauthorizedException('INVALID_PASSWORD');
    }

    const payload = { sub: user.id };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
