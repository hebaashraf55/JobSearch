import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({
      envFilePath: resolve('./config/.env'),
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string, {
      serverSelectionTimeoutMS: 5000,
      onConnectionCreate: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB connected Successfully');
        })
      },
    }),
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
