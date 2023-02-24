import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { filter, map, skip, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { select, Store } from '@ngrx/store';
import { getProducts, ProductState } from '@app/store/products';
import * as ProductActions from '@app/store/products/actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  isCreating = false;
  products: Product[] = [];
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private readonly dialog: MatDialog,
    private store: Store<ProductState>
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
        this.store.dispatch(ProductActions.GET_PRODUCTS())
        this.store.pipe(select(getProducts), takeUntil(this.destroyed$))
        .subscribe((res) => (this.products = res));
    // this.productService
    //   .getProducts()
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((res) => (this.products = res));
  }

  onCreateProduct() {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {},
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((product) => {
          this.store.dispatch(ProductActions.CREATE_PRODUCT({product}))
          this.getProducts();
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onUpdate(product: Product) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: { ...product },
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((product) => {
          this.store.dispatch(ProductActions.UPDATE_PRODUCT({product}))
          this.getProducts();
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onRemove(product: Product) {
    this.store.dispatch(ProductActions.DELETE_PRODUCT({id: product.id}))
    this.getProducts();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
