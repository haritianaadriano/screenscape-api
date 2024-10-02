import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class MovieInfoService {
  constructor(private http: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(
      this.http
        .get('https://screenscape-scrapper-api.onrender.com/movie/trending')
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response;
  }

  async findRandomlyMovie() {
    const movies = await this.findAll();
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }

  async findMoviesByGenre(genre: string) {
    const response = await firstValueFrom(
      this.http
        .get(
          `https://screenscape-scrapper-api.onrender.com/movies?type=${genre}`,
        )
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response;
  }

  async findRandomlyMoviesByGenre(genre: string) {
    const movies = await this.findMoviesByGenre(genre);
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }
}
