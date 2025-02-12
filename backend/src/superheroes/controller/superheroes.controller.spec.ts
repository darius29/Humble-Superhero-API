import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SuperheroesController } from './superhereoes.controler';
import { SuperheroesService } from '../services/superheroes.service';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Aplicăm validarea
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new superhero', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'Spider-Man',
        superpower: 'Wall Crawling',
        humilityScore: 9,
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Spider-Man');
    expect(response.body.superpower).toBe('Wall Crawling');
    expect(response.body.humilityScore).toBe(9);
  });

  it('should return 400 when humilityScore is out of range', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'Thor',
        superpower: 'Lightning',
        humilityScore: 20, // INVALID!
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      'Humility score cannot be more than 10',
    );
  });

  it('should return a list of superheroes', async () => {
    await request(app.getHttpServer()).post('/superheroes').send({
      name: 'Iron Man',
      superpower: 'Genius-Level Intellect',
      humilityScore: 5,
    });

    const response = await request(app.getHttpServer()).get('/superheroes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete a superhero', async () => {
    await request(app.getHttpServer()).post('/superheroes').send({
      name: 'Thor',
      superpower: 'Lightning',
      humilityScore: 6,
    });

    const deleteResponse = await request(app.getHttpServer()).delete(
      '/superheroes/Thor',
    );
    expect(deleteResponse.status).toBe(200);

    const getResponse = await request(app.getHttpServer()).get('/superheroes');
    expect(getResponse.body.some((hero) => hero.name === 'Thor')).toBe(false);
  });

  it('should update a superhero', async () => {
    await request(app.getHttpServer()).post('/superheroes').send({
      name: 'Hulk',
      superpower: 'Super Strength',
      humilityScore: 8,
    });

    const updateResponse = await request(app.getHttpServer())
      .patch('/superheroes/Hulk')
      .send({
        superpower: 'Extreme Strength',
        humilityScore: 7,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.superpower).toBe('Extreme Strength');
    expect(updateResponse.body.humilityScore).toBe(7);
  });

  it('should not allow duplicate superhero names', async () => {
    await request(app.getHttpServer()).post('/superheroes').send({
      name: 'Flash',
      superpower: 'Super Speed',
      humilityScore: 9,
    });

    const duplicateResponse = await request(app.getHttpServer())
      .post('/superheroes')
      .send({
        name: 'Flash',
        superpower: 'Time Travel',
        humilityScore: 10,
      });

    expect(duplicateResponse.status).toBe(400);
  });
});
