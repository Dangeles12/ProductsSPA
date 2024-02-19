import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/products/product.model';
import { BaseService } from '../base.service';

@Injectable({providedIn: 'root'})

export class ProductService extends BaseService<Product> {
    constructor(http:HttpClient) {
        super(http, "Product")
    }
}