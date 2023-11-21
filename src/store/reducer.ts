import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, sortingActions, updateCity, updateCityOffers } from './actions';
import { State } from './store.types';
import { TPlaceCard } from '../components/place-card/place-card';
import { SortOptions } from '../components/offers-sorting/offers-sorting.types';

const initialState: State = {
  city: null,
  offersList: null,
  cityOffers: [],
};

const offersSortFunctions = {
  [SortOptions.Popular]: (offers: Array<TPlaceCard>) => offers.slice(),
  [SortOptions.Price_low_to_high]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => a.price - b.price),
  [SortOptions.Price_high_to_low]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.price - a.price),
  [SortOptions.Top_rated_first]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.rating - a.rating),
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCity, (state, { payload }) => {
    state.city = payload;
  });
  builder.addCase(updateCityOffers, (state, { payload }) => {
    state.cityOffers = payload.offers.filter((offer) => offer.city.name === payload.cityName);
  });
  Object.entries(SortOptions).forEach(([, option]) => {
    const actionName = sortingActions[option];
    builder.addCase(actionName, (state, { payload }) => {
      state.cityOffers = offersSortFunctions[option](payload.offers);
    });
  });
  builder.addCase(loadOffers, (state, action) => {
    state.offersList = action.payload;
  });
});

export { reducer };
