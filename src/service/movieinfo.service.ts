import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { EmotionEnum } from '../controller/rest/enum';
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

  async findMoviesByEmotion(emotion: EmotionEnum) {
    const genre = this.defineGenreByEmotion(emotion);
    const movies = await this.findMoviesByGenre(genre);
    return movies;
  }

  async findMoviesByGenre(genre: string): Promise<ExternalMovieInfo[]> {
    const response = await firstValueFrom(
      this.http
        .get(`https://screenscape-scrapper-api.onrender.com/movies`)
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response.data.topMeterTitles.edges;
  }

  async findRandomlyMoviesByGenre(genre: string) {
    const movies = await this.findMoviesByGenre(genre);
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }

  defineGenreByEmotion(emotion: EmotionEnum): string {
    // NOTE!: available movies genre [comedie, family, horror, animation, romance, action, thriller]

    if ([EmotionEnum.ANGRY, EmotionEnum.SAD].includes(emotion)) {
      return 'comedie';
    }
    if ([EmotionEnum.HAPPY, EmotionEnum.IN_LOVE].includes(emotion)) {
      return 'romance';
    }
    if ([EmotionEnum.BOTH].includes(emotion)) {
      const glogbalEmotion = [
        'comedie',
        'family',
        'horror',
        'animation',
        'romance',
        'action',
        'thriller',
      ];
      const randomIndex = Math.floor(Math.random() * glogbalEmotion.length);

      return glogbalEmotion[randomIndex];
    }
  }
}
