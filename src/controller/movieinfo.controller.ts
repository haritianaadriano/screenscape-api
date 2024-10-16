import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieInfoApi } from './rest/movieinfo.rest';
import { MovieInfoService } from '../service/movieinfo.service';
import { EmotionEnum } from './rest/enum';

@Controller()
export class MovieInfoController {
  constructor(private readonly movieInfoService: MovieInfoService) {}

  @Get('/movies/randomly')
  @ApiTags('movies')
  @ApiCreatedResponse({
    description: 'Returns a randomly selected movie',
    type: MovieInfoApi,
  })
  getRandomlyMovie(): Promise<MovieInfoApi> {
    return this.movieInfoService.findRandomlyMovie();
  }

  @Get('/movies')
  @ApiTags('movies')
  @ApiCreatedResponse({
    description: 'Returns a randomly movie by genre',
    isArray: true,
    type: MovieInfoApi,
  })
  @ApiQuery({ name: 'emotion', enum: EmotionEnum })
  getRandomlyMoviesByEmotion(
    @Query('emotion') emotion: EmotionEnum,
  ): Promise<MovieInfoApi[]> {
    return this.movieInfoService.findMoviesByEmotion(emotion);
  }
}
