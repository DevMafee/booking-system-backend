
import { Module } from '@nestjs/common';
import { PublicUserTypesModule } from './user-types/user-types.module';
import { PublicLogModule } from './log/public-log.module';

export const PublicModuleList = [
  PublicUserTypesModule,
  PublicLogModule,
];
@Module({
  imports: PublicModuleList,
})
export class PublicModule {}
