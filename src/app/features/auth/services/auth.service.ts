import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  Observable,
  BehaviorSubject,
  throwError,
  combineLatest,
  Subject,
  of,
} from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AccountAction, LoginUser, RegisterUser } from '../models/auth';

@Injectable()
export class AuthService {
  form!: FormGroup;

  private userIsRegistering: BehaviorSubject<any> = new BehaviorSubject(false);
  userIsRegistering$: Observable<boolean> = this.userIsRegistering.asObservable();

  private accountAccessFormSubmitted: Subject<RegisterUser | LoginUser> = new Subject();
  accountAccessFormSubmitted$: Observable<RegisterUser | LoginUser> = this.accountAccessFormSubmitted.asObservable();

  registerUser$ = combineLatest([
    this.userIsRegistering$,
    this.accountAccessFormSubmitted$,
  ])
    .pipe(
      filter(([userIsRegistering, formValue]) => userIsRegistering),
      switchMap(([userIsRegistering, formValue]) => this.login(formValue as RegisterUser))
    )
    .subscribe();

  loginUser$ = combineLatest([
    this.userIsRegistering$,
    this.accountAccessFormSubmitted$,
  ])
    .pipe(
      filter(([userIsRegistering, formValue]) => !userIsRegistering),
      switchMap(([userIsRegistering, formValue]) => this.login(formValue as LoginUser))
    )
    .subscribe();

  form$: Observable<FormGroup> = this.userIsRegistering$.pipe(
    map((userIsRegistering) => {
      this.form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
      if (userIsRegistering) {
        this.form.addControl(
          'email',
          new FormControl('', [Validators.required, Validators.email])
        );
      }
      return this.form;
    })
  );

  accountAction$: Observable<AccountAction> = this.userIsRegistering$.pipe(
    map((userIsRegistering) => {
      return {
        title: userIsRegistering ? 'Register' : 'Login',
        linkLabel: userIsRegistering
          ? 'Already have an account?'
          : 'No account?',
        linkText: userIsRegistering ? 'Switch to Login' : 'Switch to Register',
      };
    })
  );

  toggleUserIsRegistering() {
    this.userIsRegistering.next(!this.userIsRegistering.getValue());
  }

  login(
    loginUser: LoginUser | RegisterUser
  ): Observable<LoginUser | RegisterUser> {
    return of(loginUser);
  }

  constructor(private http: HttpClient) {}
}
