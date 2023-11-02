import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    const PassIsMatch = await argon2.verify(user.password, password);
    if (user && PassIsMatch) {
      return user;
    }
    throw new BadRequestException('User or password are incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;
    const payload = { id: user.id, email: user.email };
    return {
      id,
      email,
      token: this.jwtService.sign(payload),
    };
  }
}
