import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { USER_JWT_SECRET } from '../../configs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TraineeAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try{
      const authorizationHeader = req.headers['authorization'];
      let token;
      if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
      }
      if(token){
        let jwtDecode =  jwt.verify(token, USER_JWT_SECRET);
        req['_user'] = jwtDecode
        return true
      }else{
        throw new UnauthorizedException('No token provided')
      }
    }catch (e) {
      throw new UnauthorizedException('Authentication failed. Please Try again! Now')
    }
  }
}
