import { Component, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";

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

  edit: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute
    ) { 
    // console.log('loaded components!');
  }

  ngOnInit(): void {
    const params = this.activatedRouter.snapshot.params;
    
    if(params){
      this.productService.getProduct(params.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.product = data;
          this.edit = true;
        }
      )
    } else this.edit = false;
  }

  submitProduct(){

    console.log('create product mode');
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

  updateProduct(){
    delete this.product.createdAt;
    this.productService.updateProduct(this.product._id, this.product)
    .subscribe(
      (data)=>{
        console.log('Product edited: ',data);
        this.router.navigate(['/product']);
      },
      (err)=> console.log('Error editing product: ', err)
    )
  }

}
