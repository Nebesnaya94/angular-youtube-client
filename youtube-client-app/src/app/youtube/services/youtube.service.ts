import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { ICard } from 'src/app/redux/state.models';
import {
  IResult,
  ISearch,
  ISearchResponse,
} from '../models/search-response.model';
import { BASE_URL } from './youtube.interceptor';
import { IThumbnails } from '../models/search-item.model';

function maxWidthImageLink(response: IThumbnails): string {
  const img = response.maxres || response.standard || response.high;
  return img.url;
}

@Injectable()
export class YoutubeService {
  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<IResult> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('maxResults', '20').set('q', query),
    };
    if (query.length < 3) return EMPTY;
    return this.http.get<ISearchResponse>('search', httpOptions).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((data) => {
        const videoIds = data.items.map((item) => item.id.videoId);
        return this.getVideoDetails(videoIds);
      }),
      catchError((error) => {
        console.log('Service error:', error);
        return EMPTY;
      })
    );
  }

  getVideoDetails(videoIds: string[]): Observable<IResult> {
    return this.http
      .get<ISearch>('videos', {
        params: new HttpParams()
          .set('id', videoIds.join(','))
          .set('part', 'snippet,statistics'),
      })
      .pipe(
        map((data) => ({
          ...data,
          items: data.items.map((item) => {
            const card: ICard = {
              id: item.id,
              title: item.snippet.title,
              description: item.snippet.description,
              imageLink: maxWidthImageLink(item.snippet.thumbnails),
              videoLink: `${BASE_URL}/videos?id=${item.id}`,
              creationDate: item.snippet.publishedAt,
              statistics: item.statistics,
            };
            return card;
          }),
        }))
      );
  }
}
