import { Injectable } from '@angular/core';


import { Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
//import 'rxjs/add/observable/throw';

import { Product, Item } from '../models/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockInventoryService {
  
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http
      .get('/assets/cart.json')
      .pipe(
        map((response) => response),
        catchError((error: any) => throwError(error)));
  }

  getProducts(): Observable<any> {
    return this.http
      .get('/assets/products.json')
      .pipe(map((response: Response) => response)
      ,catchError((error: any) => throwError(error)));
  }


  
}
