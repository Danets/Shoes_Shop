import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import * as AuthActions from '../actions';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      exhaustMap((action) =>
        this.authService.login(action.user).pipe(
          map((authResponce) => {
            this.router.navigate(['/home']);
            return AuthActions.LOGIN_SUCCESSFUL({ authResponce });
          }),
          catchError((error) => of(AuthActions.LOGIN_ERROR({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER),
      exhaustMap((action) =>
        this.authService.register(action.user).pipe(
          map((authResponce) => {
            this.router.navigate(['/home']);
            return AuthActions.REGISTER_SUCCESSFUL({ authResponce });
          }),
          catchError((error) => of(AuthActions.REGISTER_ERROR({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
