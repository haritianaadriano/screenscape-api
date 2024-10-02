import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MovieInfoApi } from './rest/movieinfo.rest';
import { MovieInfoService } from '../service/movieinfo.service';

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
  })
  getRandomlyMoviesByGenre(
    @Query('genre') genre: string,
  ): Promise<MovieInfoApi> {
    return this.movieInfoService.findRandomlyMoviesByGenre(genre);
  }
}
