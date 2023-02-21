import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';
import { LoginUser, RegisterUser } from 'src/app/features/auth/models/auth';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  user: LoginUser | RegisterUser;
  token: string;
  isAuthenticated: boolean;
  loading?: boolean;
  error?: HttpErrorResponse;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.LOGIN, AuthActions.REGISTER, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.LOGIN_SUCCESSFUL, AuthActions.REGISTER_SUCCESSFUL, (state, {authResponce}) => ({
    ...state,
    token: authResponce.idToken,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.LOGIN_ERROR, AuthActions.REGISTER_ERROR, (state, { error }) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    error
  })),
  on(AuthActions.LOGOUT, state => ({
    ...state,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }))
);
