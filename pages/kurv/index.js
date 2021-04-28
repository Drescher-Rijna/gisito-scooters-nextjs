import { useCart } from "../../global/CartContext"
import Link from 'next/link'

const Cart = () => {
    const {shoppingCart, dispatch} = useCart();
    console.log(shoppingCart)
    
    return shoppingCart.length ? (
        <div className="cart-container">
            <h1>Kurv</h1>
                    <div className="cart-content">
                        {shoppingCart.map(product => {
                            return (
                            <div className="cart-item" key={product.id} >
                                <Link className="cart-product-link" href={"/details/" + product.category + "/" + product.productId}>
                                    <img className="cart-item-img" src={product.product_img} />
                                </Link>
                                <h4 className="cart-item-name">
                                    {product.category === "komplette" && product.product_name + " Løbehjul"}
                                    {product.category === "bars" && product.product_name + " Bars"}
                                    {product.category === "decks" && product.product_name + " Deck"}
                                    {product.category === "hjul" && product.product_name + " Hjul"}
                                </h4>
                                <p className="cart-item-price">
                                    {product.price + " kr"}
                                </p>
                                <div className="remove-item-btn" onClick={() => dispatch({ type: 'REMOVE_PRODUCT', id: product.id })} >X</div>
                            </div>
                            )
                        })}
                        

                    <button className="buynow-btn-cart">
                        Betaling
                    </button>
                </div>
        </div>

    ) : (
        <div>Kurven er tom</div>
    )
}

export default Cart;