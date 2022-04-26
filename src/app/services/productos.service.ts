import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseURL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(): Observable<any> {
    return this.httpClient.get(this.baseURL);
  }

  crearProducto(producto: any): Observable<any> {
    return this.httpClient.post(this.baseURL, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.httpClient.delete(this.baseURL + id);
  }
}
