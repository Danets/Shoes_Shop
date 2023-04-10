import { InjectionToken } from "@angular/core";
import { IWeather } from "./weather";

export const WIDGET = new InjectionToken<IWeather>('Widget');