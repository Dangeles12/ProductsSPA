import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/products/product.model';
import { AlertService } from 'src/app/shared/services/alerts/alerts.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productId:number = 0;
  product!:Product;
  productForm!:FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router,
              private productService:ProductService,
              private alertService:AlertService) { }

  ngOnInit() {
    this.setForm()
    this.activatedRoute.params.subscribe(({ id }) => {
      if(Number.isInteger(+id)){
        this.productId = +id;
        this.getProduct();
      }
    })
  }

  getProduct(){
    this.productService.find(this.productId).subscribe({
      next: (result) =>{
        console.log(result)
        this.product = result;
        this.productForm.patchValue(result)

      },
      error: err => this.alertService.mixin('error getting the product', 'error'),
    })
  }

  setForm(){
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      image: new FormControl('', [Validators.required])
    })
  }

  async goBack(){
    this.router.navigate(['/products'])
  }

  save(){
    if(this.productForm.invalid){
      this.alertService.mixin('some fields are bad filled', 'error')
      this.productForm.markAllAsTouched();
      return;
    }

    if(this.productId == 0)
      this.saveProduct();
    else
      this.editProduct();
  }

  async saveProduct(){
    let obj = {
      ...this.productForm.value
    };

    this.productService.post(obj).subscribe({
      next: async () =>{
        await this.alertService.mixin('product added successfully', 'success')
        this.router.navigate(['/products'])
      },
      error: () =>{
        this.alertService.mixin('error saving the product', 'error')
      }
    })
  }

  editProduct(){
    Object.assign(this.product, this.productForm.value)

    this.productService.put(this.product).subscribe({
      next: async () => {
        await this.alertService.mixin('product updated successfully', 'success')
        this.router.navigate(['/products'])
      },
      error: () =>{
        this.alertService.mixin('error saving the product', 'error')
      }
    })
  }
}
