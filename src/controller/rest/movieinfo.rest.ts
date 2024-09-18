import { ApiProperty } from '@nestjs/swagger';

export class MovieInfoApi {
  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  streamingLink: string;

  @ApiProperty()
  streamingLogo: string;
}
