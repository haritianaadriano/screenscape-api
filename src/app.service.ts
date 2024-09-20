import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getServerHealth() {
    const response = await firstValueFrom(
      this.http
        .get('https://screenscape-scrapper-api.onrender.com/ping')
        .pipe(map((res: AxiosResponse) => res.data)),
    );
    return response;
  }
}
