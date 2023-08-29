import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, ICard } from '../state.models';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectCreatedCards = createSelector(
  selectAppState,
  (state: AppState) => state.createdCards
);

export const selectResultCards = createSelector(
  selectAppState,
  (state: AppState) => state.resultCards
);

export const selectAllCards = createSelector(
  selectCreatedCards,
  selectResultCards,
  (createdCards: ICard[], resultCards: ICard[]) =>
    createdCards.concat(resultCards)
);
