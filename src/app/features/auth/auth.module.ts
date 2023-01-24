import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
