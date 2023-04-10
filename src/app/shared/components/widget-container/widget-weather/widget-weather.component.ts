import { Component } from '@angular/core';
import { IWeather } from '../weather';
import { WIDGET } from '../widget.token';

@Component({
  selector: 'app-widget-weather',
  templateUrl: './widget-weather.component.html',
  styleUrls: ['./widget-weather.component.scss'],
  providers: [
    { provide: WIDGET, useExisting: WidgetWeatherComponent, multi: true },
  ],
})
export class WidgetWeatherComponent implements IWeather {
  isLoading = false;
  load() {
    console.log('Load data from WEATHER API... ');
  }
  refresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
