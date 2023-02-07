import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, tap, Subject, takeUntil } from 'rxjs';
import { AccountAction, LoginUser, RegisterUser } from '../../models/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  form$: Observable<UntypedFormGroup> = this.authService.form$;

  accountAction$: Observable<AccountAction> = this.authService.accountAction$;

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
    private render: Renderer2
  ) {}

  toggleRegisterUser() {
    this.authService.toggleUserIsRegistering();
  }

  onSubmit(form: any) {
    const user = {
      ...form.value,
      returnSecureToken: true
    }
    this.authService.login(user)
    .pipe(takeUntil(this.notifier))
    .subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  openPass(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
