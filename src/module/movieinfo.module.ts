import { Module } from '@nestjs/common';
import { MovieInfoController } from '../controller/movieinfo.controller';
import { HttpModule } from '@nestjs/axios';
import { MovieInfoService } from 'src/service/movieinfo.service';
import { MovieMapper } from 'src/controller/mapper/movie.mapper';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [MovieInfoService, MovieMapper],
  controllers: [MovieInfoController],
})
export class MovieInfoModule {}
