import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as productReducer from '../reducers';

export const getProductState = createFeatureSelector<productReducer.ProductState>('product');

export const getProducts= createSelector(getProductState, (state: productReducer.ProductState) => state.products);
export const getProductLoading = createSelector(getProductState, (state: productReducer.ProductState) => state.loading);
export const getProductError = createSelector(getProductState, (state: productReducer.ProductState) => state.error);

