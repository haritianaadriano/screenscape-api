import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieInfoApi } from './rest/movieinfo.rest';
import { MovieInfoService } from '../service/movieinfo.service';
import { EmotionEnum } from './rest/enum';
import { MovieMapper } from './mapper/movie.mapper';

@Controller()
export class MovieInfoController {
  constructor(
    private readonly movieInfoService: MovieInfoService,
    private readonly mapper: MovieMapper,
  ) {}

  @Get('/movies/randomly')
  @ApiTags('movies')
  @ApiCreatedResponse({
    description: 'Returns a randomly selected movie',
    type: MovieInfoApi,
  })
  async getRandomlyMovie(): Promise<MovieInfoApi> {
    return this.mapper.mapToMovieInfoApi(
      await this.movieInfoService.findRandomlyMovie(),
    );
  }

  @Get('/movies')
  @ApiTags('movies')
  @ApiCreatedResponse({
    description: 'Returns a randomly movie by genre',
    isArray: true,
    type: MovieInfoApi,
  })
  @ApiQuery({ name: 'emotion', enum: EmotionEnum })
  async getRandomlyMoviesByEmotion(
    @Query('emotion') emotion: EmotionEnum,
  ): Promise<MovieInfoApi[]> {
    const responses = await this.movieInfoService.findMoviesByEmotion(emotion);
    return responses.map((movie) => this.mapper.mapToMovieInfoApi(movie));
  }
}
