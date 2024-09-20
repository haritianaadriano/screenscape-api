import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieInfoModule } from './module/movieinfo.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MovieInfoModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
