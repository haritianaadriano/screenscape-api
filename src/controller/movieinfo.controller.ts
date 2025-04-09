import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieInfoApi } from './rest/movieinfo.rest';
import { MovieInfoService } from '../service/movieinfo.service';
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
    description: 'Returns related movies',
    isArray: true,
    type: MovieInfoApi,
  })
  @ApiQuery({ name: 'id' })
  async getRandomlyMoviesByEmotion(
    @Query() id: string,
  ): Promise<MovieInfoApi[]> {
    const responses = await this.movieInfoService.findRelatedMovies(id);
    return responses.map((movie) => this.mapper.mapToMovieInfoApi(movie));
  }
}
