import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './stock-inventory.component';
import { StockBranchComponent } from '../../components/stock-branch/stock-branch.component';
import { StockCounterComponent } from '../../components/stock-counter/stock-counter.component';
import { StockProductsComponent } from '../../components/stock-products/stock-products.component';
import { StockSelectorComponent } from '../../components/stock-selector/stock-selector.component';
import { StockInventoryService } from '../../services/stock-inventory.service';

import {Observable,of}  from 'rxjs';
import {By}  from '@angular/platform-browser';
import {fakeAsync} from '@angular/core/testing';
//import 'rxjs/add/observable/of';


class MockStockInventoryService {
  getProducts() {
    return of([{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another test'}]);
  }
  getCartItems() {
    return of([{ product_id: 1, quantity: 10 }, { product_id: 2, quantity: 5 }]);
  }
}

describe('StockInventoryComponent', () => {

  let component: StockInventoryComponent;
  let fixture: ComponentFixture<StockInventoryComponent>;
  let el: DebugElement;
  let service: StockInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        StockInventoryComponent,
        StockBranchComponent,
        StockCounterComponent,
        StockProductsComponent,
        StockSelectorComponent
      ],
      providers: [
        { provide: StockInventoryService, useClass: MockStockInventoryService }
      ]
    });

    fixture = TestBed.createComponent(StockInventoryComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    service = el.injector.get(StockInventoryService);
  });

  it('should get cart items and products on init', () => {
   
    spyOn(service, 'getProducts').and.callThrough();
    spyOn(service, 'getCartItems').and.callThrough();
    component.ngOnInit();
    expect(service.getProducts).toHaveBeenCalled();
    expect(service.getCartItems).toHaveBeenCalled();
  });

  it('should call the onsubmit on form submission',()=>{
   
    component.ngOnInit();
    
    
    spyOn(component,'onSubmit');
    let formsubmit=fixture.debugElement.queryAll(By.css('.myform'))[0];
    formsubmit.triggerEventHandler('ngSubmit',null);
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();

   
  })

  it('should have the right number of elements',()=>{
    component.ngOnInit();

    let button=fixture.debugElement.queryAll(By.css('.submit'));
    expect(button.length).toBe(1);

    let store=fixture.debugElement.queryAll(By.css('.store'));
    expect(store.length).toBe(1);
    // let el=fixture.debugElement.queryAll(By.all());
    //console.log("el", el)

   
  })

  it('should have allchild elements',()=>{
    component.ngOnInit();
    let stockproductsChildDebugElement = fixture.debugElement.query(By.directive(StockProductsComponent));
    expect(stockproductsChildDebugElement).toBeDefined();

    let stockselectorChildDebugElement = fixture.debugElement.query(By.directive(StockSelectorComponent));
    expect(stockselectorChildDebugElement).toBeDefined();

    let stockbranchChildDebugElement = fixture.debugElement.query(By.directive(StockBranchComponent));
    expect(stockbranchChildDebugElement).toBeDefined();

  })

  it('should create a product map from the service response', () => {
    component.ngOnInit();
    expect(component.productsMap.get(1)).toEqual({ id: 1, price: 10, name: 'Test' });
    expect(component.productsMap.get(2)).toEqual({ id: 2, price: 100, name: 'Another test' });
  });

  it('should store the products response', () => {
    component.ngOnInit();
    expect(component.products).toEqual([{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another test'}]);
  });

  it('should create a stock item for each cart item', () => {
    spyOn(component, 'addStock');
    component.ngOnInit();
    expect(component.addStock).toHaveBeenCalledWith({ product_id: 1, quantity: 10 });
    expect(component.addStock).toHaveBeenCalledWith({ product_id: 2, quantity: 5 });
  });

});
