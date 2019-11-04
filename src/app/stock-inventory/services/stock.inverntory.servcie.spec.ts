import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable,of } from 'rxjs';
import { StockInventoryService } from './stock-inventory.service';


function createResponse(body) {
  return of(
   new HttpResponse({ body: body })
  );
}

class MockHttp {
  get() {
    return createResponse([]);
  }
  
}

const cartItems = [{ product_id: 1, quantity: 10 }, { product_id: 2, quantity: 5 }];
const productItems = [{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another Test' }];

describe('StockInventoryService', () => {

  let service: StockInventoryService;
  let http: HttpClient;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
        { provide: HttpClient, useClass: MockHttp }
      ]
    });
    http = bed.get(HttpClient);
    service = bed.get(StockInventoryService);
  });

  it('should get cart items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...cartItems]));

    service.getCartItems()
      .subscribe((result) => {
      console.log("TCL: result", result)
        expect(result.body.length).toBe(2);
        expect(result.body).toEqual(cartItems);
      });
  });

  it('should get product items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...productItems]));

    service.getProducts()
      .subscribe((result) => {
        expect(result.body.length).toBe(2);
        expect(result.body).toEqual(productItems);
      });
  });

});