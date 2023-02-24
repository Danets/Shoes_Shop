import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, map, catchError, delay, share } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ProductService } from '@app/features/products/services/product.service';
import * as ProductActions from '../actions';

@Injectable()
export class ProductEffects {

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.GET_PRODUCTS),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          // share(),
          map(products => ProductActions.GET_PRODUCTS_SUCCESSFUL({ products })),
          catchError(error => of(ProductActions.GET_PRODUCTS_ERROR({ error })))
        )
      )
    )
  );

  // getProductById$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductActions.GET_PRODUCT_BY_ID),
  //     mergeMap(({ id }) =>
  //       from(this.productService.getProductById(id)).pipe(
  //         map(product => ProductActions.GET_PRODUCT_BY_ID_SUCCESSFUL({ product })),
  //         catchError(error => of(ProductActions.GET_PRODUCT_BY_ID_ERROR({ error })))
  //       )
  //     )
  //   )
  // );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.CREATE_PRODUCT),
      switchMap(({ product }) =>
      from(this.productService.createProduct(product)).pipe(
          // delay(3000),
          map(product => ProductActions.CREATE_PRODUCT_SUCCESSFUL({ product })),
          catchError(error => of(ProductActions.CREATE_PRODUCT_ERROR({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.UPDATE_PRODUCT),
      mergeMap(({ product }) =>
      from(this.productService.updateProduct(product)).pipe(
          map(product => ProductActions.UPDATE_PRODUCT_SUCCESSFUL({ product })),
          catchError(error => of(ProductActions.UPDATE_PRODUCT_ERROR({ error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.DELETE_PRODUCT),
      mergeMap(({ id }) =>
      from(this.productService.removeProduct(id)).pipe(
          map((product) => ProductActions.DELETE_PRODUCT_SUCCESSFUL({ product })),
          catchError(error => of(ProductActions.DELETE_PRODUCT_ERROR({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

}
