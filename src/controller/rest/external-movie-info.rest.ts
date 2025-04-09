export class ExternalMovieInfo {
  node!: {
    __typename: string;
    id: string;
    titleText: {
      text: string;
      isOriginalTitle: boolean;
    };
    originalTitleText: {
      text: string;
      isOriginalTitle: boolean;
    };
    releaseYear: {
      __typename: string;
      year: number;
      endYear: number | null;
    };
    releaseDate: {
      __typename: string;
      month: number;
      day: number;
      year: number;
      country: {
        id: string;
      };
      restriction: string | null;
      attributes: {
        id: string;
        text: string;
      }[];
      displayableProperty: {
        qualifiersInMarkdownList: string | null;
      };
    };
    titleType: {
      __typename: string;
      id: string;
      text: string;
      categories: MovieCategory[];
      canHaveEpisodes: boolean;
      isEpisode: boolean;
      isSeries: boolean;
      displayableProperty: {
        value: {
          plainText: string;
        };
      };
    };
    primaryImage: {
      __typename: string;
      id: string;
      url: string;
      height: number;
      width: number;
    };
    meterRanking: {
      __typename: string;
      currentRank: number;
      rankChange: {
        changeDirection: string;
        difference: number;
      };
    };
  };
}

export class MovieCategory {
  id: string;
  text: string;
  value: string;
}
