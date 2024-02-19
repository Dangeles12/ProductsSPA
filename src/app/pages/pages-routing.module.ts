import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  //products
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductFormComponent },
  { path: "**", pathMatch: 'full', redirectTo:'products'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }