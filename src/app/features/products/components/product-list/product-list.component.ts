import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  displayedColumns: string[] = ['id', 'title', 'src', 'date'];
  @Input() products$: Observable<Product[]>;

}
