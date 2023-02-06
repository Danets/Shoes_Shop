import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  formProduct: FormGroup;
  @Output() productCreated = new EventEmitter<Product>();
  @Output() canceled = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.formProduct = formBuilder.group({   
      "title": ["", [Validators.required]],
      "src": ["", Validators.required],
      "dsc": ["", Validators.required],
      "date": [new Date()]
  });
  }

  onCreate(formProduct) {
    this.productCreated.emit(formProduct.value);
    this.formProduct.reset();
  }

  onCancel() {
    this.canceled.emit();
  }
}
