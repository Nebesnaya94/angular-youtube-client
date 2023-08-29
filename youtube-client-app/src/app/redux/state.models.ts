import { IStatistics } from '../youtube/models/search-item.model';

export interface ICard {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  videoLink: string;
  creationDate: string;
  statistics: IStatistics;
}

export interface AppState {
  createdCards: ICard[];
  resultCards: ICard[];
}
