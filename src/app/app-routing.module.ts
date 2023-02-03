import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth/auth.component';
import { AuthGuard } from './features/auth/services/auth.guard';
import { CategoriesComponent } from './features/products/components/categories/categories.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductComponent } from './features/products/components/product/product.component';
import { PageComponent } from './shared/components/page/page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: PageComponent },
  { path: 'categories', canActivate: [AuthGuard], loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  { path: 'auth', component: AuthComponent  },
  { path: '**', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
