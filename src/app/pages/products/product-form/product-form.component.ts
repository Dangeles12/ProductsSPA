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
  action:string = "";
  productId:number = 0;
  product!:Product;
  productForm!:FormGroup;
  image:string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router,
              private productService:ProductService,
              private alertService:AlertService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if(Number.isInteger(+id)){
        this.productId = +id;
        this.getProduct();
        this.getQueryParams()
      }
      else{
        this.action = "create";
        this.setForm()
      }
    })
  }

  getQueryParams(){
    this.activatedRoute.queryParams.subscribe(({type}) => {
      this.action = type ?? 'create'
    })
  }

  getProduct(){
    this.productService.find(this.productId).subscribe({
      next: (result) =>{
        this.product = result;
        this.image = this.product.image;
      },
      error: err => this.alertService.mixin('error getting the product', 'error'),
      complete: () => this.setForm()
    })
  }

  setForm(){
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name ?? '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.product?.description ?? ''),
      quantity: new FormControl(this.product?.quantity ?? 0, [Validators.required, Validators.min(1)]),
      price: new FormControl(this.product?.price ?? 0, [Validators.required, Validators.min(1)]),
    })

    if(this.action == 'consult'){
      this.productForm.disable();
    }
    else{
      this.productForm.enable();
    }
  }

  async goBack(){
    await this.alertService.mixin('operation cancelled', 'error')
    this.router.navigate(['/products'])
  }

  save(){
    if(this.productForm.invalid){
      this.alertService.mixin('some fields are bad filled', 'error')
      this.productForm.markAllAsTouched();
      return;
    }

    if(this.action == 'create')
      this.saveProduct();
    else
      this.editProduct();
  }

  async saveProduct(){
    let obj = {
      image: this.image,
      ...this.productForm.value
    };

    this.productService.post(obj).subscribe({
      next: async () =>{
        await this.alertService.mixin('product added successfully', 'success')
        this.productForm.reset();
      },
      error: () =>{
        this.alertService.mixin('error saving the product', 'error')
      }
    })
  }

  editProduct(){
    Object.assign(this.product, this.productForm.value)
    this.product.image = this.image

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

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
    };
  }
}
