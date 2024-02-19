import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { ProductsModule } from './products/products.module';


@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        ProductsModule,
        HttpClientModule
    ],
    exports: [
        PagesRoutingModule,
    ],
    declarations: [
        
    ],
    providers: [],
})
export class PagesModule { }
