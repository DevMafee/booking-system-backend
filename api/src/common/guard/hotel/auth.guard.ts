import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HOTEL_JWT_SECRET } from '../../configs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class HotelAuthGuard implements CanActivate {
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
        let jwtDecode =  jwt.verify(token, HOTEL_JWT_SECRET);
        req['_hotel'] = jwtDecode
        return true
      }else{
        throw new UnauthorizedException('No token provided')
      }
    }catch (e) {
      throw new UnauthorizedException('Authentication failed. Please Try again! Now')
    }
  }
}
