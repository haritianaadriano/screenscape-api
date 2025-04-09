import { ExternalMovieInfo } from '../rest/external-movie-info.rest';
import { MovieInfoApi } from '../rest/movieinfo.rest';

export class MovieMapper {
  mapToMovieInfoApi(movie: ExternalMovieInfo): MovieInfoApi {
    const response = new MovieInfoApi();
    response.id = movie.node.id;
    response.title = movie.node.originalTitleText.text;
    response.isASeries = movie.node.titleType.isEpisode;
    response.categories = movie.node.titleType.categories;
    response.streamingLogo = movie.node.primaryImage.url;
    response.releaseDate = this.formatReleaseDate(movie.node.releaseDate);

    return response;
  }

  private formatReleaseDate(releaseDate: {
    __typename: string;
    month: number;
    day: number;
    year: number;
    country: { id: string };
  }): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const day = pad(releaseDate.day);
    const month = pad(releaseDate.month);
    const year = releaseDate.year.toString();

    return `${day}/${month}/${year}`;
  }
}
