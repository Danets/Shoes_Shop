import { Component, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, tap, Subject, takeUntil } from 'rxjs';
import { AccountAction, LoginUser, RegisterUser } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { select, Store } from '@ngrx/store';
import { AuthState, getAuthLoading } from '@app/store/auth';
import * as AuthActions from '@app/store/auth/actions';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  form$: Observable<UntypedFormGroup> = this.authService.form$;
  accountAction$: Observable<AccountAction> = this.authService.accountAction$;
  isLoading$: Observable<boolean>;
  isVisiblePassword = false;
  isVisibleconfirmPassword = false;

  notifier = new Subject<void>();

  accountAccess$: Observable<{
    form: UntypedFormGroup;
    accountAction: AccountAction;
  }> = combineLatest(
    [this.authService.form$, this.authService.accountAction$],
    (accountAccessForm, accountAction) => {
      return {
        form: accountAccessForm,
        accountAction: accountAction,
      };
    }
  );

  constructor(
    public authService: AuthService,
    private router: Router,
    private authFacade: AuthFacadeService
  ) {
    this.isLoading$ = this.authFacade.isLoading$;
  }

  toggleRegisterUser() {
    this.authService.toggleUserIsRegistering();
  }

  onSubmit(form: any) {
    const user = {
      ...form.value,
      returnSecureToken: true,
    };
    if ('username' in user) {
      delete user.username;
      this.authFacade.register(user);
    } else {
      this.authFacade.login(user);
    }
  }

  openPass(input: any) {
    this.isVisiblePassword = !this.isVisiblePassword;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  openConfirmPass(input: any) {
    this.isVisibleconfirmPassword = !this.isVisibleconfirmPassword;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
