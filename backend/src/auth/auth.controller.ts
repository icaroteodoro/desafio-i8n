import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDTO } from './dto/login-dto';
import { RegisterDTO } from './dto/register-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} 


    @Post('/register')
    @HttpCode(HttpStatus.OK)
    async register(@Body() createUser: RegisterDTO) {
        return this.authService.signUp(createUser);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUser: LoginDTO) {
        return this.authService.signIn(loginUser);
    }
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() data: {refreshToken: string}) {
        return this.authService.refreshToken(data.refreshToken);
    }


    @Get('user')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUserByEmail() {
        return this.authService.getUser('teste@teste.com')
    }
}
