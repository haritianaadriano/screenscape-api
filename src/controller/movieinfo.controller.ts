import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MovieInfoApi } from './rest/movieinfo.rest';
import { MovieInfoService } from '../service/movieinfo.service';

@Controller()
export class MovieInfoController {
  constructor(private readonly movieInfoService: MovieInfoService) {}

  @Get('movies')
  @ApiTags('movies')
  @ApiCreatedResponse({
    description: 'Returns a list of movies',
    type: MovieInfoApi,
    isArray: true,
  })
  getMovies(): Promise<MovieInfoApi[]> {
    return this.movieInfoService.findAll();
  }
}
