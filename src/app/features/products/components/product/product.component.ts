import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 product?: Product

 constructor(private productService: ProductService,
   private route: ActivatedRoute, private router: Router) {}

 ngOnInit() {
   this.route.params
   .subscribe(params => this.product = this.productService.getProduct(+params['productId']))
 }

 onGetBack() {
  this.router.navigateByUrl('page');
 }

}
