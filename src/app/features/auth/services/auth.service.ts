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
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AccountAction, LoginUser, RegisterUser, API_KEY, AuthResponse } from '../models/auth';

@Injectable()
export class AuthService {
  form!: FormGroup;

  private userIsRegistering: BehaviorSubject<any> = new BehaviorSubject(false);
  userIsRegistering$: Observable<boolean> = this.userIsRegistering.asObservable();

  private accountAccessFormSubmitted: Subject<RegisterUser | LoginUser> = new Subject();
  accountAccessFormSubmitted$: Observable<RegisterUser | LoginUser> = this.accountAccessFormSubmitted.asObservable();

  constructor(private http: HttpClient) {}

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
        email: new FormControl('', Validators.email),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
      if (userIsRegistering) {
        this.form.addControl(
          'username',
          new FormControl('', [Validators.required])
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

  get token(): string | null {
    const expiresDate = localStorage.getItem('expiresDate')
    if (new Date() > new Date(expiresDate as string)) {
      this.logout()
      return null
    } else {
      return localStorage.getItem('idToken')
    }
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      localStorage.setItem('idToken', response.idToken);
      const expiresIn = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('expiresDate', expiresIn.toString())
    } else {
      localStorage.clear()
    }
  } 

  isAuthenticated(): boolean {
   return !!this.token;
  } 

  login(
    loginUser: LoginUser | RegisterUser
  ): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, loginUser)
    .pipe(tap(res => this.setToken(res as AuthResponse)))
  }

  logout() {
    this.setToken(null)
  }

}
