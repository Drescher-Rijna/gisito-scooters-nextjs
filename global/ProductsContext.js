import React, { createContext, useState, useEffect,useContext } from "react";
import { db } from "./Firebase";

export const ProductsContext = createContext();

export function useProducts() {
    return useContext(ProductsContext);
}

const ProductsContextProvider = ({ children }) => {
    const [completes, setCompletes] = useState([])
    const [decks, setDecks] = useState([])
    const [bars, setBars] = useState([])
    const [wheels, setWheels] = useState([])
    const [loading, setLoading] = useState(true)

    const getCollectionData = async (collectionName) => {
        const collection = await db.collection(collectionName).get()
        const products = collection.docs.map((doc) => ({id: doc.id, ...doc.data()}))

        return products;
        
    }

    useEffect(async () => {
        setCompletes(await getCollectionData("completes"));
        setDecks(await getCollectionData("decks"))
        setBars(await getCollectionData("bars"))
        setWheels(await getCollectionData("wheels"))
        
        setLoading(false)

        console.log("slut")
    }, [])

    
    

    return (
        <ProductsContext.Provider value={{completes, decks, bars, wheels}} >
            {!loading && children }
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;