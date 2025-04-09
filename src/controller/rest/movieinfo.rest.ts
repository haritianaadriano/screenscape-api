import { ApiProperty } from '@nestjs/swagger';
import { MovieCategory } from './external-movie-info.rest';

export class MovieInfoApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  streamingLogo: string;

  @ApiProperty()
  releaseDate: string;

  @ApiProperty()
  isASeries: boolean;

  @ApiProperty()
  categories: MovieCategory[];
}
