import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { PageComponent } from './shared/components/page/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page'},
  { path: 'page', component: PageComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
