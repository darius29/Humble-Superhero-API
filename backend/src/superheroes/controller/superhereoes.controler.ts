import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SuperheroesService } from '../services/superheroes.service';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  addSuperhero(@Body() superhero: CreateSuperheroDto) {
    const newHero = this.superheroesService.addSuperhero(superhero);
    return newHero;
  }

  @Get()
  getSuperheroes() {
    return this.superheroesService.getSuperheroes();
  }

  @Patch(':name')
  editSuperhero(
    @Param('name') name: string,
    @Body() updatedData: Partial<CreateSuperheroDto>,
  ) {
    return this.superheroesService.editSuperhero(name, updatedData);
  }

  @Delete(':name')
  deleteSuperhero(@Param('name') name: string) {
    return this.superheroesService.deleteSuperhero(name);
  }
}
