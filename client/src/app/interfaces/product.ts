/**
 * Interfaz de descripcion de los
 * datos de entrada de la entidad
 * Producto desde la REST API
 */
export interface Product {
  _id ? : string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  createdAt: Date;
}
