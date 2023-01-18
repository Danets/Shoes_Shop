import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  slidesStore = [
    {id: 1, src: 'https://images.prom.ua/3795465719_krossovki-nike-air.jpg', alt: 'nike'},
    {id: 2, src: 'https://images.prom.ua/2756754521_w640_h640_muzhskie-vysokie-krossovki.jpg', alt: 'adidas'},
    {id: 3, src: 'https://content.rozetka.com.ua/goods/images/big/293719923.jpg', alt: 'puma'},
  ];
}
