import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.use(logger);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3050);
}
bootstrap();
