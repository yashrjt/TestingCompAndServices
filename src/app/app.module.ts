import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockInventoryComponent } from './stock-inventory/containers/stock-inventory/stock-inventory.component';
import { StockBranchComponent } from './stock-inventory/components/stock-branch/stock-branch.component';
import { StockCounterComponent } from './stock-inventory/components/stock-counter/stock-counter.component';
import { StockProductsComponent } from './stock-inventory/components/stock-products/stock-products.component';
import { StockSelectorComponent } from './stock-inventory/components/stock-selector/stock-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StockInventoryService } from './stock-inventory/services/stock-inventory.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    StockInventoryComponent,
    StockBranchComponent,
    StockCounterComponent,
    StockInventoryComponent,
    StockProductsComponent,
    StockSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  
    HttpClientModule
  ],
  providers: [StockInventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
