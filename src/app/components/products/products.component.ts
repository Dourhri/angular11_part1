import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productsService : ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    // console.log("start .........")
     this.products$ =this.productsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        //map((data)=>({dataState:DataStateEnum.LOADED, data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );

  }

  onGetSelectedProducts() {
    this.products$ =this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      //map((data)=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ =this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      //map((data)=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ =this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      //map((data)=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }


  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
     p.selected = data.selected;
      })
  }

  onDelete(p: Product) {
    let v =confirm("Etes vous sure ?");
    if(v==true)
     this.productsService.deleteProduct(p)
       .subscribe(data=>{
         this.onGetAllProducts();
       })
  }

  onNewProducts() {
   this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type){
      case ProductActionType.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionType.GET_SELECCTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionType.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionType.NEW_PRODUCT:this.onNewProducts();break;
      case ProductActionType.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionType.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionType.EDIT_PRODUCT:this.onEdit($event.payload);break;
      case ProductActionType.DELETE_PRODUCT:this.onDelete($event.payload);break;

    }
  }
}
