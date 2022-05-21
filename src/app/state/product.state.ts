export  enum ProductActionType{
  GET_ALL_PRODUCTS = "[Product] GET ALL PRODUCT",
  GET_SELECCTED_PRODUCTS = "[Product] GET SELECTED PRODUCT",
  GET_AVAILABLE_PRODUCTS = "[Product] GET AVAILABLE PRODUCT",
  SEARCH_PRODUCTS = "[Product]  SEARCH PRODUCT",
  NEW_PRODUCT = "[Product]  NEW PRODUCT",
  SELECT_PRODUCT = "[Product]  SELECT PRODUCT",
  EDIT_PRODUCT = "[Product]  EDIT PRODUCT",
  DELETE_PRODUCT = "[Product]  DELETE PRODUCT"
}
export interface ActionEvent{
  type:ProductActionType,
  payload?:any
}
export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}
export interface AppDataState<T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string

}
