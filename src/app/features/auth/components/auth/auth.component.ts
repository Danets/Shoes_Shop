import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, tap } from 'rxjs';
import { AccountAction, LoginUser, RegisterUser } from '../../models/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form$: Observable<UntypedFormGroup> = this.authService.form$;

  accountAction$: Observable<AccountAction> = this.authService.accountAction$;

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
  ) {}

  toggleRegisterUser() {
    this.authService.toggleUserIsRegistering();
  }

  onSubmit(form: any) {
    const user = {
      ...form.value,
      returnSecureToken: true
    }
    this.authService.login(user).subscribe(() => {
      this.router.navigate(['/page']);
    });
  }

}
