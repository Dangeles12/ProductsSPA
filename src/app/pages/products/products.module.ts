import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidationsPipe } from 'src/app/shared/pipes/Validations.pipe';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        ProductListComponent,
        ProductCardComponent,
        ProductFormComponent,
        ValidationsPipe,
    ],
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductFormComponent,
        ValidationsPipe
    ],
    providers: [],
})
export class ProductsModule { }
