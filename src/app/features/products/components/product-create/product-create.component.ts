import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  formProduct: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formProduct = formBuilder.group({   
      "title": ["", [Validators.required]],
      "src": ["", Validators.required],
      "dsc": ["", Validators.required],
      "date": [new Date()]
  });
  }

  onCreate(formProduct) {
    console.log('formProduct', formProduct.value)
  }
}
