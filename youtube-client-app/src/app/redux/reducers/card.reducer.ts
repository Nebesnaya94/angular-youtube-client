import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.models';
import {
  addCreatedCard,
  searchVideos,
  searchVideosSuccess,
  updateResultCards,
} from '../actions/card.actions';

export const InitialState: AppState = {
  createdCards: [],
  resultCards: [],
};

export const appReducer = createReducer(
  InitialState,
  on(addCreatedCard, (state, { card }) => ({
    ...state,
    createdCards: [...state.createdCards, card],
  })),
  on(updateResultCards, (state, { results }) => ({
    ...state,
    resultCards: results,
  })),
  on(searchVideos, (state) => ({
    ...state,
    resultCards: [],
  })),
  on(searchVideosSuccess, (state, { results }) => ({
    ...state,
    resultCards: results.items,
  }))
);
