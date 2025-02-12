import { Module } from '@nestjs/common';
import { SuperheroesModule } from './superheroes/modules/superheroes.module';

@Module({
  imports: [SuperheroesModule],
})
export class AppModule {}
