import { createAction, props } from '@ngrx/store';
import { IResult } from 'src/app/youtube/models/search-response.model';
import { ICard } from '../state.models';

export const addCreatedCard = createAction(
  '[Card] Add Created Card',
  props<{ card: ICard }>()
);

export const updateResultCards = createAction(
  '[Card] Update Result Cards',
  props<{ results: ICard[] }>()
);

export const searchVideos = createAction(
  '[Youtube] Search Videos',
  props<{ query: string }>()
);
export const searchVideosSuccess = createAction(
  '[Youtube] Search Videos Success',
  props<{ results: IResult }>()
);
