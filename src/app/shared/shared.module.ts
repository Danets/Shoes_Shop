import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { PageComponent } from './components/page/page.component';
import { HeaderComponent } from './layout/header/header.component';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { WidgetContainerComponent } from './components/widget-container/widget-container.component';
import { WidgetWeatherComponent } from './components/widget-container/widget-weather/widget-weather.component';
import { WidgetVelocityComponent } from './components/widget-container/widget-velocity/widget-velocity.component';

@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    CustomCheckboxComponent,
    WidgetContainerComponent,
    WidgetWeatherComponent,
    WidgetVelocityComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    CarouselModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    CarouselModule,
    CustomCheckboxComponent,
    WidgetContainerComponent,
    WidgetWeatherComponent,
    WidgetVelocityComponent
  ]
})
export class SharedModule { }
