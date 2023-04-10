import { Component } from '@angular/core';
import { IWeather } from '../weather';
import { WIDGET } from '../widget.token';

@Component({
  selector: 'app-widget-velocity',
  templateUrl: './widget-velocity.component.html',
  styleUrls: ['./widget-velocity.component.scss'],
  providers: [
    { provide: WIDGET, useExisting: WidgetVelocityComponent, multi: true },
  ],
})
export class WidgetVelocityComponent implements IWeather {
  isLoading = false;
  load() {
    console.log('Load data from Velocity API... ');
  }
  refresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
