import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '30s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
