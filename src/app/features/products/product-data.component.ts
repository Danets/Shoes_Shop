import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Product } from './models/product';
import { ProductService } from './services/product.service';

export class ProductDataComponent implements DataSource<Product> {
  private productSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public products$ = this.productSubject.asObservable();

  constructor(private productService: ProductService) {}

  connect(collectionViewer?: CollectionViewer): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productSubject.complete();
    this.loadingSubject.complete();
  }

  loadProducts(
    filter = "",
    sortDirection = "asc",
    pageIndex = 0,
    pageSize = 3
  ) {
    this.loadingSubject.next(true);

    this.productService
      .findProducts(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((products) => this.productSubject.next(products));
  }

  getProductsLength(): number {
    let lengthProducts;
    this.products$.subscribe(res => lengthProducts = res.length)
    return lengthProducts;
  }
}
