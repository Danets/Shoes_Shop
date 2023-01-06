import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { PageComponent } from './components/page/page.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent
  ]
})
export class SharedModule { }
