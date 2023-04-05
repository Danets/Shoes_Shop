import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { filter,takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductFacadeService } from '../../services/product-facade.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  isCreating = false;
  products$: Observable<Product[]>;
  destroyed$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private productFacade: ProductFacadeService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productFacade.getProducts();
    this.products$ = this.productFacade.products$;
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
          this.productFacade.createProduct(product);
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
          this.productFacade.updateProduct(product);
          this.getProducts();
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onRemove(product: Product) {
    this.productFacade.deleteProduct(product);
    this.getProducts();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
