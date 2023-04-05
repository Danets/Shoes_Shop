import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { getProducts, ProductState } from '@app/store/products';
import * as ProductActions from '@app/store/products/actions';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  products$ = this.store.pipe(select(getProducts));

  constructor(private store: Store<ProductState>) { }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getProducts(): void {
    this.dispatch(ProductActions.GET_PRODUCTS());
  }

  createProduct(product: Product): void {
    this.dispatch(ProductActions.CREATE_PRODUCT({product}))
  }

  updateProduct(product: Product): void {
    this.dispatch(ProductActions.UPDATE_PRODUCT({product}))
  }

  deleteProduct(product: Product): void {
    this.dispatch(ProductActions.DELETE_PRODUCT({id: product.id}))
  }
}
