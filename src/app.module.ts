import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieInfoModule } from './module/movieinfo.module';

@Module({
  imports: [MovieInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
