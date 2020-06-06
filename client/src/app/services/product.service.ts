import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from "@angular/common/http";
import {
  Product
} from "../interfaces/product";
import {
  Observable
} from "rxjs";
import { GenericResponse } from '../interfaces/gresponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Dirección REST API
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Se obtiene la lista (catálogo) de productos
   * disponibles desde la REST API
   */
  getProducts(): Observable <Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  /**
   * Se obtiene un producto especifico
   * a traves de la busqueda de su ID 
   * desde la REST API
   * @param productId string
   */
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${productId}`);
  }

  /**
   * Se crea un nuevo producto con sus
   * propiedades especificas en la 
   * REST API
   * @param product 
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/products`, product);
  }

  /**
   * Se elimina un producto especificando
   * su ID única a través de la 
   * REST API.
   * @param productId 
   */
  deleteProduct(productId: string): Observable <Product> {
    return this.http.delete<Product>(`${this.BASE_URL}/products/${productId}`);
  }

 /**
   * Se actualiza un producto especificando
   * su ID única a través de la 
   * REST API.
  * @param productId 
  * @param product 
  */
  updateProduct(productId: string, product: Product): Observable <Product> {
    return this.http.put<Product>(`${this.BASE_URL}/products/${productId}`, product);
  }

}
