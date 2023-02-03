import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: CategoriesComponent, children: [
    { path: 'new', component: ProductCreateComponent },
    { path: ':id', component: ProductComponent },
    { path: ':id/edit', component: ProductCreateComponent },
  ] 
  },
];


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    CategoriesComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
