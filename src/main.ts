import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';


async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: process.env.APP_NAME,
    })
  });
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  });
}
bootstrap();
