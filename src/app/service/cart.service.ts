import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartItemsList : any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any) {
    this.cartItemsList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemsList.push(product);
    this.productList.next(this.cartItemsList);
    this.getTotalPrice();
    console.log(this.cartItemsList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemsList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem (product : any) {
    this.cartItemsList.map((a:any, index:any)=>{
      if(product.id== a.id){
        this.cartItemsList.splice(index,1);
      
      }
    })
    this.productList.next(this.cartItemsList);
  }
  removeAllCart(){
    this.cartItemsList = []
    this.productList.next(this.cartItemsList)
  }
}
