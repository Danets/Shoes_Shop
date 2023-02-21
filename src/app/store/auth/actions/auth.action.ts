import { createAction, props } from '@ngrx/store';
import {
  LoginUser,
  AuthResponse,
  RegisterUser,
} from 'src/app/features/auth/models/auth';

export const LOGIN = createAction(
  '[Login Page] LOGIN',
  props<{ user: LoginUser }>()
);

export const LOGIN_SUCCESSFUL = createAction(
  '[Login Page] LOGIN_SUCCESSFUL',
  props<{ authResponce: AuthResponse }>()
);

export const LOGIN_ERROR = createAction(
  '[Login Page] LOGIN_ERROR',
  props<{ error: any }>()
);

export const REGISTER = createAction(
  '[Register Page] REGISTER',
  props<{ user: RegisterUser }>()
);

export const REGISTER_SUCCESSFUL = createAction(
  '[Register Page] REGISTER_SUCCESSFUL',
  props<{ authResponce: AuthResponse }>()
);

export const REGISTER_ERROR = createAction(
  '[Register Page] REGISTER_ERROR',
  props<{ error: any }>()
);

export const LOGOUT = createAction('[Login Page] LOGOUT');
