import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of, shareReplay, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';

import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'any',
})
export class ProductService {
  slides: Product[] = [
    {
      id: '1',
      title: 'nike',
      dsc: 'The Shiba Inu is the smallest of the six original and distinct spitz',
      src: 'https://images.prom.ua/3795465719_krossovki-nike-air.jpg',
    },
    {
      id: '2',
      title: 'adidas',
      dsc: 'breeds of dog from Japan. A small, agile dog that copes very well with mountainous',
      src: 'https://images.prom.ua/2756754521_w640_h640_muzhskie-vysokie-krossovki.jpg',
    },
    {
      id: '3',
      title: 'puma',
      dsc: 'the Shiba Inu was originally bred for hunting.',
      src: 'https://content.rozetka.com.ua/goods/images/big/293719923.jpg',
    },
  ];
  productCreated$ = new Subject();

  private productCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly http: HttpClient,
    private readonly firestore: Firestore
  ) {
    this.productCollection = collection(firestore, 'products');
  }

  getSlides(): Observable<Product[]> {
    return of(this.slides);
  }

  getSlide(id: string): Observable<Product> {
    return of(this.slides.find((prod) => prod.id === id));
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productCollection, {
      idField: 'id',
    }) as Observable<Product[]>;
  }

  findProducts(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    // let params = new HttpParams();
    // params = params.append('startAt',`${filter}`);
    // params = params.append('orderBy',`${sortDirection}`);
    // params = params.append('pageIndex',pageIndex.toString());
    // params = params.append('limitToFirst',pageSize.toString());

    return this.http
      .get<Product[]>(
        `${environment.urlFB}/products.json?orderBy=${sortDirection}&startAt=${filter}&pageIndex=${pageIndex}&limitToFirst=${pageSize}`
        // {
        //   params: new HttpParams()
        //     .set("startAt", filter)
        //     .set("orderBy", String(sortDirection))
        //     .set("pageIndex", pageIndex.toString())
        //     .set("limitToFirst", pageSize.toString()),
        // }
      )
      .pipe(
        delay(5000),
        map((res) =>
          Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
          }))
        )
      );
  }

  getProductById(id: string) {
    const productDocumentReference = doc(this.firestore, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  createProduct(product: Product) {
    const doc = addDoc(this.productCollection, product)
    .then((docRef) => {
      const newProduct = { id: docRef.id, ...product }
    });
    return doc;
  }

  updateProduct(product: Product) {
    const productDocumentReference = doc(
      this.firestore,
      `products/${product.id}`
    );
    return updateDoc(productDocumentReference, { ...product, id: product.id});
  }

  removeProduct(id: string) {
    const productDocumentReference = doc(
      this.firestore,
      `products/${id}`
    );
    return deleteDoc(productDocumentReference);
  }
}
