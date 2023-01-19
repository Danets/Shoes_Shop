import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  products: Product[] = [
    {id: 1,title: 'nike', dsc: 'The Shiba Inu is the smallest of the six original and distinct spitz', src: 'https://images.prom.ua/3795465719_krossovki-nike-air.jpg', alt: 'nike'},
    {id: 2,title: 'adidas', dsc: 'breeds of dog from Japan. A small, agile dog that copes very well with mountainous', src: 'https://images.prom.ua/2756754521_w640_h640_muzhskie-vysokie-krossovki.jpg', alt: 'adidas'},
    {id: 3,title: 'puma', dsc: 'the Shiba Inu was originally bred for hunting.', src: 'https://content.rozetka.com.ua/goods/images/big/293719923.jpg', alt: 'puma'},
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Product | undefined {
    const product = this.products.find(prod => prod.id === id);
    return product;
  }
}
