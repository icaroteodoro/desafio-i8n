import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} 


    @Post('/register')
    @HttpCode(HttpStatus.OK)
    async register(@Body() createUser: iCreateUser) {
        return this.authService.signUp(createUser);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUser: iLoginUser) {
        return this.authService.signIn(loginUser);
    }

    @Get('user')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUserByEmail() {
        return this.authService.getUser('teste@teste.com')
    }
}
