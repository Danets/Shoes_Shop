import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  formProduct: FormGroup;
  productLength: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly dialogRef: MatDialogRef<ProductCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly product: Product
  ) {
    this.productLength = Object.keys(product).length;
    this.formProduct = formBuilder.group({
      title: [product ? product.title : null, [Validators.required]],
      src: [product ? product.src : null, Validators.required],
      dsc: [product ? product.dsc : null, Validators.required],
      date: [new Date()],
    });
  }

  onCreate() {
    this.dialogRef.close({ ...this.product, ...this.formProduct.value });
  }

  onCancel() {
    this.formProduct.reset();
    this.dialogRef.close();
  }
}
