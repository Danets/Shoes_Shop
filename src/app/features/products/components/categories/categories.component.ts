import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isCreating = false;
  products$: Observable<Product[]>;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

ngOnInit(): void {
  this.getProducts();
}

  onCreateProduct(product: Product) {
    // this.router.navigate(['categories/new'])
    // this.router.navigate(['new'], {relativeTo: this.route});
    this.productService.createProduct(product).pipe(take(1)).subscribe(res => {
      this.isCreating = false;
      this.getProducts();
    })
  }

  onCancelProduct() {
    this.isCreating = false;
  }

  getProducts(): void {
    this.products$ = this.productService.getProducts().pipe(map(res => {
      return Object.keys(res).map(key => ({
        ...res[key],
        id: key
      }));
    }));
  }

}
