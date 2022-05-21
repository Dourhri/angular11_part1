import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionType} from "../../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmiter : EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }


  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEventEmiter.emit({type:ProductActionType.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    this.productEventEmiter.emit({type:ProductActionType.GET_SELECCTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.productEventEmiter.emit({type:ProductActionType.GET_AVAILABLE_PRODUCTS});
  }

  onNewProducts() {
    this.productEventEmiter.emit({type:ProductActionType.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    this.productEventEmiter.emit({type:ProductActionType.SEARCH_PRODUCTS,payload:dataForm})
  }
}
