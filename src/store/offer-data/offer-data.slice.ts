import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import { changeFavoriteStatusAction, fetchFavoriteOffersActions, fetchOffersAction, loadNearbyOffersAction, loadOfferByIDAction } from '../actions/api-actions';

const initialState: OfferData = {
  offers: [],
  fullOffer: undefined,
  nearbyOffers: [],
  favoriteOffers: [],
  activeCard: '',
  isOffersDataLoading: true,
  isNearByOffersDataLoading: true,
  isOfferByIdDataLoading: true,
  isAddingOfferToFavorite: false,
  isFavoriteOffersLoading: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeActiveCard: (state, action: PayloadAction<string>) => {
      state.activeCard = action.payload;
    },
    changeFavoriteStatus: (state, action: PayloadAction<string>) => {
      const offerIndex = state.offers.findIndex((offer) => offer.id === action.payload);
      state.offers[offerIndex].isFavorite = !state.offers[offerIndex].isFavorite;

      if (state.fullOffer && action.payload === state.fullOffer.id) {
        state.fullOffer.isFavorite = !state.fullOffer?.isFavorite;
      }

      const nearbyIndex = state.nearbyOffers.findIndex((nearbyOffer) => nearbyOffer.id === action.payload);
      if (nearbyIndex !== -1) {
        state.nearbyOffers[nearbyIndex].isFavorite = !state.nearbyOffers[nearbyIndex].isFavorite;
      }

      state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== state.offers[offerIndex].id);

    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(loadOfferByIDAction.pending, (state) => {
        state.isOfferByIdDataLoading = true;
      })
      .addCase(loadOfferByIDAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isOfferByIdDataLoading = false;
      })
      .addCase(loadOfferByIDAction.rejected, (state) => {
        state.isOfferByIdDataLoading = false;
      })
      .addCase(loadNearbyOffersAction.pending, (state) => {
        state.isNearByOffersDataLoading = true;
      })
      .addCase(loadNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearByOffersDataLoading = false;
      })
      .addCase(loadNearbyOffersAction.rejected, (state) => {
        state.isNearByOffersDataLoading = false;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isAddingOfferToFavorite = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state) => {
        state.isAddingOfferToFavorite = false;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.isAddingOfferToFavorite = false;
      })
      .addCase(fetchFavoriteOffersActions.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersActions.fulfilled, (state, action) => {
        state.isFavoriteOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersActions.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      });
  }
});

export const { changeActiveCard, changeFavoriteStatus } = offerData.actions;
