import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log('token', token);
    // console.log("outside try");
    try {
      //   console.log('inside try');
      const decodedToken = this.jwtService.verify(token, {
        secret: 'secret',
      });
    // this.jwtService.verify(token, {
    //         secret: 'secret',
    //       })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
        // console.log(decodedToken);
    //   console.log('Date', Date.now());
    //   console.log('Decoded', decodedToken.exp * 1000);
      //   console.log(Date.now() >= decodedToken.exp * 1000);
    //   request['user'] = {
    //     user_name: decodedToken.user_name,
    //     password: decodedToken.password,
    //   };
    } catch {
      throw new UnauthorizedException("access token expired");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
