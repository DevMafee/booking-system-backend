import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserTypesService } from './services/user-types.service';
import { UserTypesController } from './controllers/user-types.controller';
import { AdminAuthMiddleware } from '../../../common/middlewares/admin/admin-auth.middleware';

@Module({
  controllers: [UserTypesController],
  providers: [UserTypesService]
})
export class PublicUserTypesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware)
  }
}

