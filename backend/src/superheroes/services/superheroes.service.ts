import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';

@Injectable()
export class SuperheroesService {
  private superheroes: CreateSuperheroDto[] = [];

  addSuperhero(superhero: CreateSuperheroDto) {
    const exists = this.superheroes.some(
      (s) => s.name.toLowerCase() === superhero.name.toLowerCase(),
    );
    if (exists) {
      throw new BadRequestException('Superhero already exists!');
    }
    this.superheroes.push(superhero);

    return superhero;
  }

  getSuperheroes() {
    return this.superheroes
      .slice()
      .sort((a, b) => b.humilityScore - a.humilityScore);
  }

  editSuperhero(name: string, updatedData: Partial<CreateSuperheroDto>) {
    const heroIndex = this.superheroes.findIndex(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );

    if (heroIndex === -1) {
      throw new NotFoundException('Superhero not found!');
    }

    this.superheroes[heroIndex] = {
      ...this.superheroes[heroIndex],
      ...updatedData,
    };
    return this.superheroes[heroIndex];
  }

  deleteSuperhero(name: string) {
    const heroIndex = this.superheroes.findIndex(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );

    if (heroIndex === -1) {
      throw new NotFoundException(`Superhero ${name} not found!`);
    }

    this.superheroes.splice(heroIndex, 1);
    return { message: `${name} was deleted successfully.` };
  }
}
