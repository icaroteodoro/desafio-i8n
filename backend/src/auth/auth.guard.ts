import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if(!authorization) throw new UnauthorizedException('Token is required');
    try{
      const payload = await this.jwtService.verifyAsync(authorization, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      request.user = payload;
    }catch(err){
      throw new UnauthorizedException('Invalid Token');
    } 
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
