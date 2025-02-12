import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
