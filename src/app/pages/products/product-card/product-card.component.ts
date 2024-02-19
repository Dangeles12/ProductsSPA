import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products/product.model';
import { AlertService } from 'src/app/shared/services/alerts/alerts.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!:Product;
  hover:boolean = false;
  constructor(private alertService:AlertService,
              private productService:ProductService) { }

  ngOnInit() {
  }

  delete(){
    this.alertService.deleteToast().then(result =>{
      if(result.isConfirmed){
        this.productService.delete(this.product.id).subscribe({
          next: () =>{
            this.alertService.mixin('product deleted successfully', 'success')
          }
        })
      }
    })
  }
}
