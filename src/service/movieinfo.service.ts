import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { ExternalMovieInfo } from '../controller/rest/external-movie-info.rest';

@Injectable()
export class MovieInfoService {
  constructor(private http: HttpService) {}

  async findAll(): Promise<ExternalMovieInfo[]> {
    const response = await firstValueFrom(
      this.http
        .get('https://screenscape-scrapper-api.onrender.com/movies')
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response.data.topMeterTitles.edges;
  }

  async findRandomlyMovie(): Promise<ExternalMovieInfo> {
    const movies = await this.findAll();
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }

  async findRelatedMovies(id: string): Promise<ExternalMovieInfo[]> {
    const response = await firstValueFrom(
      this.http
        .get(
          `https://screenscape-scrapper-api.onrender.com/related-movies?id=${id}`,
        )
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response.data.topMeterTitles.edges;
  }
}
