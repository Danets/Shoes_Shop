import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  slides: Product[] = [
    {id: 1,title: 'nike', dsc: 'The Shiba Inu is the smallest of the six original and distinct spitz', src: 'https://images.prom.ua/3795465719_krossovki-nike-air.jpg'},
    {id: 2,title: 'adidas', dsc: 'breeds of dog from Japan. A small, agile dog that copes very well with mountainous', src: 'https://images.prom.ua/2756754521_w640_h640_muzhskie-vysokie-krossovki.jpg'},
    {id: 3,title: 'puma', dsc: 'the Shiba Inu was originally bred for hunting.', src: 'https://content.rozetka.com.ua/goods/images/big/293719923.jpg'},
  ];
  productCreated$ = new Subject();

  constructor(private http: HttpClient) { }

  getSlides(): Observable<Product[]> {
    return of(this.slides);
  }

  getSlide(id: number): Product {
    return this.slides.find(prod => prod.id === id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.urlFB}/products.json`).pipe(shareReplay(1));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.urlFB}/${id}/products.json`);
  }

  createProduct(product: Product): Observable<Product> {
    this.productCreated$.next(product);
    return this.http.post<Product>(`${environment.urlFB}/products.json`, product);
    
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.urlFB}/products.json`, product);
  }

  removeProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${environment.urlFB}/${product.id}/products.json`);
  }
}
