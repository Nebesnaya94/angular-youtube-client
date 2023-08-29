export interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
  maxres?: IThumbnail;
  standard?: IThumbnail;
}

interface ILocalized {
  title: string;
  description: string;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  localized: ILocalized;
  defaultAudioLanguage: string;
}

export interface ISearchItem {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
  statistics: IStatistics;
}

export interface ISearchResponseItem {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
}
