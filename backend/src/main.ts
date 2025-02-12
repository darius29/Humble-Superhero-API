import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cors from 'cors'; // Importează CORS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors()); // 🔥 Activează CORS pentru toate originile

  const PORT = process.env.PORT || 3001; // Folosește portul definit în .env sau 3001
  await app.listen(PORT);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
