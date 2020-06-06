import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../interfaces/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { 
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(
      (data) => {
        console.log('Fetch Products: ', data);
        this.products = data;
      },
      (err) => console.log('ERROR: ', err)
    );
  }

  deleteProduct(id:string){
    this.productService.deleteProduct(id)
    .subscribe(
      (data) => {
        this.getProducts();
        console.log('Product deleted!', data);
      },
      (err) => console.log(err)
    );
  }

}
