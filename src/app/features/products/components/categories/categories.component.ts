import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateComponent } from '../product-create/product-create.component';

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
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((res) => (this.products = res));
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
        tap((product) =>
          this.productService.createProduct(product).then((_) => {
            this.getProducts();
          })
        ),
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
        tap((product) =>
          this.productService.updateProduct(product).then((_) => {
            this.getProducts();
          })
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onRemove(product: Product) {
    this.productService.removeProduct(product).then((res) => {
      this.getProducts();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
