import { db } from "./Firebase"


export const getCollectionData = async (collectionName) => {
    const collection = await db.collection(collectionName).get()
    const products = collection.docs.map((doc) => ({id: doc.id, ...doc.data()}))

    return products
}
