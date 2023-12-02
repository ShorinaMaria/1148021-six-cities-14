import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TPlaceCard } from '../../components/place-card/place-card';
import { CityName, NameSpace } from '../../const';
import { SortOptions } from '../../components/offers-sorting/offers-sorting.types';

const initialState: {
  city: CityName | null;
  cityOffers: Array<TPlaceCard>;
  error: string | null;
} = {
  city: null,
  cityOffers: [],
  error: null,
};

const offersSortFunctions = {
  [SortOptions.Popular]: (offers: Array<TPlaceCard>) => offers.slice(),
  [SortOptions.Price_low_to_high]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => a.price - b.price),
  [SortOptions.Price_high_to_low]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.price - a.price),
  [SortOptions.Top_rated_first]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.rating - a.rating),
};

export const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    updateCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    updateCityOffers: (
      state,
      action: PayloadAction<{ offers: Array<TPlaceCard>; cityName: CityName; option: SortOptions }>
    ) => {
      const { offers, cityName, option } = action.payload;
      const cityOffers = offers.filter((offer) => offer.city.name === cityName);
      state.cityOffers = offersSortFunctions[option](cityOffers);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateCity, updateCityOffers, setError } = citiesSlice.actions;