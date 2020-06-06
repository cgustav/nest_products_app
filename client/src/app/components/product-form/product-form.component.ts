import { Component, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price:0,
    imageURL: '',
    createdAt: new Date(Date.now())
  };

  constructor(
    private productService: ProductService,
    private router: Router
    ) { 
    // console.log('loaded components!');
  }

  ngOnInit(): void {
  }

  submitProduct(){
    // console.log(this.product);
    this.productService.createProduct(this.product)
      .subscribe(
        (data)=>{
          console.log('Product created: ',data);
          this.router.navigate(['/']);
        },
        (err)=>console.log(err)
        );
  }

}
