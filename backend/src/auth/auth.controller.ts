import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
}
