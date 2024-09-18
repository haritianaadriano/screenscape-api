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
}
