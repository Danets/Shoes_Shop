import { Injectable } from '@angular/core';
import { AuthState, getAuthLoading } from '@app/store/auth';
import * as AuthActions from '@app/store/auth/actions';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterUser, LoginUser } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {
    this.isLoading$ = this.store.pipe(select(getAuthLoading));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }

  register(user: RegisterUser) {
    this.dispatch((AuthActions.REGISTER({user})))
  }

  login(user: LoginUser) {
    this.dispatch((AuthActions.LOGIN({user})))
  }
}
