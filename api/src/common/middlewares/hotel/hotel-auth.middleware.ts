import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { HOTEL_JWT_SECRET } from '../../configs/config';

@Injectable()
export class HotelAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try{
            const authorizationHeader = req.headers['authorization'];
            let token;
            if(authorizationHeader){
                token = authorizationHeader.split(' ')[1];
            }
            if(token){
                let jwtDecode =  jwt.verify(token, HOTEL_JWT_SECRET);
                req.body['_hotel'] = jwtDecode;
                next();
            }else{
                throw new UnauthorizedException('No token provided')
            }
        }catch (e) {
            throw new UnauthorizedException('Authentication failed. Please Try again!')
        }
    }
}
