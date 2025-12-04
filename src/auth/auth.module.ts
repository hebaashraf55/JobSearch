import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModel } from 'src/DB/models/user.model';

@Module({
  imports: [UserModel],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
