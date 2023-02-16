import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  concat,
  merge,
  map,
  Observable,
  tap,
  debounceTime,
  distinctUntilChanged,
  take,
} from 'rxjs';
import { Product } from '../../models/product';
import { ProductDataComponent } from '../../product-data.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'title',
    'src',
    'date',
    'remove',
    'update',
  ];
  selection = new SelectionModel<Product>(true, []);
  dataSource: any;

  @Input() products: Product[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  @Output() productRemoved = new EventEmitter<Product>();
  @Output() productUpdated = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  ngAfterViewInit() {
    // server-side search
    // fromEvent(this.input.nativeElement,'keyup')
    // .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     tap(() => {
    //         this.paginator.pageIndex = 0;
    //         this.loadPage();
    //     })
    // )
    // .subscribe();
    // reset the paginator after sorting
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // merge(this.sort.sortChange, this.paginator.page)
    //     .pipe(
    //         tap(() => this.loadPage())
    //     )
    //     .subscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.products.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.products);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  onRemove(row: Product) {
    this.productRemoved.next(row);
  }

  onUpdate(row: Product) {
    this.productUpdated.next(row);
  }

  // loadPage() {
  //     this.dataSource.loadProducts(
  //         this.input.nativeElement.value,
  //         this.sort.direction,
  //         this.paginator.pageIndex,
  //         this.paginator.pageSize);
  // }
}
