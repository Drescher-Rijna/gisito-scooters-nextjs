import { v4 as uuid } from 'uuid';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, {
        productId: action.product.productId,
        category: action.product.category,
        product_name: action.product.product_name, 
        product_img: action.product.product_img, 
        price: action.product.price,
        id: uuid()}
      ]
    case 'REMOVE_PRODUCT':
      return state.filter(product => product.id !== action.id);
    default:
      return state;
  }
} 