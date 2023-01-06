import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links = [
    // { url: '/', name: 'Home' },
    { url: '/page', name: 'Page' },
    { url: '/products', name: 'Products' },
  ];

}
