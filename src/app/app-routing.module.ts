import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth/auth.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductComponent } from './features/products/components/product/product.component';
import { PageComponent } from './shared/components/page/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page'},
  { path: 'page', component: PageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductComponent  },
  { path: 'auth', component: AuthComponent  },
  { path: '**', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
