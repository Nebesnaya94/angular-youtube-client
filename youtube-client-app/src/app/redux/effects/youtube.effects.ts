import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { searchVideos, searchVideosSuccess } from '../actions/card.actions';

@Injectable()
export class YoutubeEffects {
  searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchVideos),
      switchMap((action) =>
        this.youtubeService.searchVideos(action.query).pipe(
          map((results) => searchVideosSuccess({ results })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private youtubeService: YoutubeService
  ) {}
}
