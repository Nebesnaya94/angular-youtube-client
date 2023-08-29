import { ICard } from 'src/app/redux/state.models';
import { ISearchItem, ISearchResponseItem } from './search-item.model';

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ISearch {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ISearchItem[];
}

export interface ISearchResponse {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ISearchResponseItem[];
  nextPageToken: string;
  regionCode: string;
}

export interface IResult {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ICard[];
}
