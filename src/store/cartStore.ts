import { create } from "zustand";
import { ProductType } from "../pages/Home";

type CartIteam = {
  product:ProductType,
  quantity:number
}

type CartState = {
  cartIteams:CartIteam[],
  addIteam:(iteam:ProductType)=>void,
  decIteam:(iteam:ProductType)=>void
  clearIteam:()=>void
}

export const useCartStore = create<CartState>((set)=>({
  //Declare States hear
  cartIteams:[],

  //Declare update func hear to change state
  addIteam:((iteam:ProductType)=>{
    set((state)=>{
      const cartExist = state.cartIteams.find((cartIteam)=>cartIteam.product.id==iteam.id)
      if(cartExist){
        return{
          cartIteams:state.cartIteams.map((cartIeam)=>{
            if(cartIeam.product.id==iteam.id){
              cartIeam.quantity++
              return cartIeam
            }
            return cartIeam
          })
        }
      }
      else{
        return{
          cartIteams:[...state.cartIteams,{product:iteam,quantity:1}]
        }
      }
    })
  }),
  decIteam:((iteam)=>{
    set((state)=>{
        return{
          cartIteams:state.cartIteams.filter((cartIteam)=> !(cartIteam.product.id==iteam.id && cartIteam.quantity==1))
          .map((filterdIteam)=>{
            if(filterdIteam.product.id==iteam.id){
              return {...filterdIteam,quantity:filterdIteam.quantity-1}
            }
            return filterdIteam
          })
        }
    })
  }),
  clearIteam:()=>{
    set(()=>{
      return {
        cartIteams:[]
      }
    })
  }
  
}))
