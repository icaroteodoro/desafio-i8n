import {
    BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUser:iLoginUser) {
    const user = await this.userService.findUserByEmail(loginUser.email);
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(loginUser.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(user: iCreateUser) {
    const userExists = await this.userService.findUserByEmail(user.email);
    if(userExists) throw new BadRequestException('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUser: iUser = {
      name: user.name,
      email: user.email,
      password: hashPassword,
    };
    const createdUser = await this.userService.createUser(newUser);

    const payload = { sub: createdUser.id, email: createdUser.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  //PARA TESTE
  async getUser(email: string){
    const response = await this.userService.findUserByEmail(email);
    if(!response) throw new NotFoundException('User not found')
    const {password, ...rest} = response;
    return rest;
  }
}
