import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './features/components/products/products.component';
import { PageComponent } from './shared/components/page/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page'},
  { path: 'page', component: PageComponent },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
