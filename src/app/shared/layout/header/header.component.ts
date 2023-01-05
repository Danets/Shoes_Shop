import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links = [
    { url: '/', name: 'Home' },
    { url: '/offers', name: 'Offers' },
    { url: '/history', name: 'History' },
    { url: '/about', name: 'About Us' },
  ];

}
