import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ADMIN_JWT_SECRET } from '../../configs/config';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try{
            const authorizationHeader = req.headers['authorization'];
            let token;
            if(authorizationHeader){
                token = authorizationHeader.split(' ')[1];
            }
            if(token){
                let jwtDecode =  jwt.verify(token, ADMIN_JWT_SECRET);
                req.body['_admin'] = jwtDecode;
                next();
            }else{
                throw new UnauthorizedException('No token provided')
            }
        }catch (e) {
            throw new UnauthorizedException('Authentication failed. Please Try again!')
        }
    }
}
