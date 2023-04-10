import { Component, OnInit, ContentChild } from '@angular/core';
import { IWeather } from './weather';
import { WIDGET } from './widget.token';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent implements OnInit {
  @ContentChild(WIDGET as any, {static: true})
  widget: IWeather;
  
  ngOnInit(): void {
    this.widget.load();
  }
  onRefresh() {
    this.widget.refresh();
  }

}
