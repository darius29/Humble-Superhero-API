// src/superheroes/superheroes.module.ts
import { Module } from '@nestjs/common';
import { SuperheroesController } from '../controller/superhereoes.controler';
import { SuperheroesService } from '../services/superheroes.service';

@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
