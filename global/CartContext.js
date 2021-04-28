import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

const CartContextProvider = (props) => {
    const { currentUser } = useAuth();

    console.log("usecart start")
    const [shoppingCart, dispatch] = useReducer(cartReducer ,[], () => {
        if (currentUser) {
            const localData = localStorage.getItem(currentUser.uid);
            return localData ? JSON.parse(localData) : [];
        } else {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        }
        
    })
    
    useEffect(() => {
        console.log("usecart useeffect")
        if (currentUser) {
            localStorage.setItem(currentUser.uid, JSON.stringify(shoppingCart))
        } else {
            localStorage.setItem('cart', JSON.stringify(shoppingCart))
        }
        
    }, [shoppingCart])

    return (
        <CartContext.Provider value={{shoppingCart, dispatch}}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;

