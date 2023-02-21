import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AuthReducer from '../reducers';

export const getAuthState = createFeatureSelector<AuthReducer.AuthState>('auth');
export const getAuthLoading = createSelector(getAuthState, (state: AuthReducer.AuthState) => state.loading);
export const getAuthError = createSelector(getAuthState, (state: AuthReducer.AuthState) => state.error);
export const getAuthIsAuthenticated = createSelector(getAuthState, (state: AuthReducer.AuthState) => state.isAuthenticated);
export const getAuthToken = createSelector(getAuthState, (state: AuthReducer.AuthState) => state.token);

