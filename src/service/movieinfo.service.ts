import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { EmotionEnum } from 'src/controller/rest/enum';

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

  async findMoviesByEmotion(emotion: EmotionEnum) {
    const genre = this.defineGenreByEmotion(emotion);
    const movies = await this.findMoviesByGenre(genre);
    return movies;
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

  async findRandomlyByEmotion(emotion: EmotionEnum) {
    const genre = this.defineGenreByEmotion(emotion);
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
