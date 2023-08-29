import { PasswordResetsEntity } from './../../../common/entities/shared/password-reset/password-resets.entity';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthMiddleware } from '../../../common/middlewares/admin/admin-auth.middleware';
import { PasswordResetController } from './controllers/password-reset-code.controller';
import { PasswordResetService } from './services/password-reset-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetsEntity])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware);
  }
}
