import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { concat, merge, map, Observable, tap, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { Product } from '../../models/product';
import { ProductDataComponent } from '../../product-data.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'src', 'date'];
  // @Input() products$: Observable<Product[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource: ProductDataComponent;

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.dataSource = new ProductDataComponent(this.productService);
      this.dataSource.loadProducts();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadPage();
        })
    )
    .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();
}

loadPage() {
    this.dataSource.loadProducts(
        this.input.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
}

}
