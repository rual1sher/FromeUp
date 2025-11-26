import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import token from './token';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Вы должны быть авторизованы');
    }

    const payload = token.verifyAccessToken(accessToken);

    request.id = payload.id;

    return true;
  }
}
