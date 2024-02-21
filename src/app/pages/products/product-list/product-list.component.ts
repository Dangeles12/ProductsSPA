import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products/product.model';
import { AlertService } from 'src/app/shared/services/alerts/alerts.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];
  _products:Product[] = [];
  searchParam:string = ""
  loading:boolean = false;
  seeAsTable:boolean = true;

  constructor(private productService:ProductService,
              private alertService:AlertService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.loading = true
    this.productService.get().subscribe({
      next: result =>{
        this.products = result;
        this._products = result;
        
        this.loading = false
      },
      error: () => {
        this.alertService.mixin('Error getting products', 'error');
        this.loading = false
      },
    })
  }

  search(){
    if(this.searchParam == "") 
      this.products = this._products;
      
    this.products = this._products.filter(p => p.name.includes(this.searchParam) ||
                                               p.description.includes(this.searchParam))
  }

  delete(product:Product){
    let title = `Do you want to delete ${product.name}?`
    this.alertService.deleteToast({ title }).then(result =>{
      if(result.isConfirmed){
        this.productService.delete(product.id).subscribe({
          next: () =>{
            this.alertService.mixin('product deleted successfully', 'success')
            this.getProducts()
          },
          error: () =>{
            this.alertService.mixin('Error deleting product', 'error')
          }
        })
      }
    })
  }
}
