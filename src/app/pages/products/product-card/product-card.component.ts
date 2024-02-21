import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter();  
  hover:boolean = false;
  constructor(private alertService:AlertService,
              private productService:ProductService) { }

  ngOnInit() {
  }

  delete(){
    this.deleteProduct.emit(this.product)
  }
}
