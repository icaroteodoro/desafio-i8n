import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-dto';
import { RegisterDTO } from './dto/register-dto';
import { UserDTO } from 'src/users/dto/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUser: LoginDTO) {
    const user = await this.userService.findUserByEmail(loginUser.email);
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(
      loginUser.password,
      user.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      token,
      refreshToken,
    };
  }

  async signUp(user: RegisterDTO) {
    const userExists = await this.userService.findUserByEmail(user.email);
    if (userExists) throw new BadRequestException('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUser: UserDTO = {
      name: user.name,
      email: user.email,
      password: hashPassword,
    };
    const createdUser = await this.userService.createUser(newUser);

    const payload = { sub: createdUser.id, email: createdUser.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const userEmail = payload.email;

    const user = await this.userService.findUserByEmail(userEmail);
    if (!user) throw new NotFoundException('User not found');

    const newPayload = { sub: user.id, email: user.email };

    const newToken = await this.jwtService.signAsync(newPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const newRefreshToken = await this.jwtService.signAsync(newPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };

  }

  //PARA TESTE
  async getUser(email: string) {
    const response = await this.userService.findUserByEmail(email);
    if (!response) throw new NotFoundException('User not found');
    const { password, ...rest } = response;
    return rest;
  }
}
