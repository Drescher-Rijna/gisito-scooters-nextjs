import { useEffect, useState } from "react";
import { useCart } from "../../../global/CartContext";
import { getCollectionData } from "../../../global/GetCollection";

export const getStaticPaths = async () => {
    const completes = await getCollectionData("completes");

    const paths = completes.map(complete => {
        return {
            params: { completeid: complete.id.toString() }
        }
    })

    return {
      paths: paths,
      fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.completeid;
    const completes = await getCollectionData("completes");
    const product = await completes.find((complete)=> complete.id === id);

    return {
      props: {
        product: product
      }
    }
}

export default function CompleteDetails({product}) {
    console.log(product.id)
    const {shoppingCart, dispatch} = useCart();
    const [product_name, setProduct_Name] = useState('');
    const [product_img, setProduct_Img] = useState('');
    const [price, setPrice] = useState('');

    const handleAdd = () => {
        console.log("handeling add")
        dispatch({ type: 'ADD_PRODUCT', product: { productId: product.id, category: product.category, product_name: product.product_name, product_img: product.product_img, price: product.price }});
        setProduct_Name('');
        setProduct_Img('');
        setPrice('');
        
    }

    return (
        <section className="details-page">
            <section className="details-product-options">
                <div className="product-image complete-details-img">
                    <img src={product.product_img} />
                </div>
                <img className="brand-logo" src={product.brand} />
                <h1>
                    {product.product_name + " Løbehjul"}
                </h1>
                <p>
                    {product.price + " kr"}
                </p>
                <div className="details-buttons">
                    <button className="cart-btn" onClick={handleAdd} >
                        LÆG I KURV
                    </button>
                    <button className="buynow-btn" >
                        KØB NU
                    </button>
                </div>
            </section>
            <section className="details-product-description">
                <h2>
                    BESKRIVELSE
                </h2>
                <p>
                    {product.description}
                </p>
                <h3>
                    Tech feature
                </h3>
                <ul>
                    <li>
                        {product.tech_feature}
                    </li>
                </ul>
            </section>
            <section className="details-product-specs">
                <h2>SPECIFIKATIONER</h2>
                <div className="table">
                    <div className="table-column-1">
                        <div className="table-row">
                            <div className="table-td">
                                Total højde:
                            </div>
                            <div className="table-td">
                                {product.total_height + "cm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Compression System:
                            </div>
                            <div className="table-td">
                                {product.compression_system}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Vægt:
                            </div>
                            <div className="table-td">
                                {product.weight + "g"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar Højde:
                            </div>
                            <div className="table-td">
                                {product.bar_height + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar bredde:
                            </div>
                            <div className="table-td">
                                {product.bar_width + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Deck Længde:
                            </div>
                            <div className="table-td">
                                {product.deck_length + "cm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Deck bredde:
                            </div>
                            <div className="table-td">
                                {product.deck_width + "cm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Hjuldiameter:
                            </div>
                            <div className="table-td">
                                {product.wheel_diameter + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Hjul nav bredde:
                            </div>
                            <div className="table-td">
                                {product.wheel_nav_width + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Headtube vinkel
                            </div>
                            <div className="table-td">
                                {product.headtube_angle + "°"}
                            </div>
                        </div>
                    </div>
                    <div className="table-column-2">
                        <div className="table-row">
                            <div className="table-td">
                                Dropout form:
                            </div>
                            <div className="table-td">
                                {product.dropout_form}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar form:
                            </div>
                            <div className="table-td">
                                {product.bar_form}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar ydre diameter:
                            </div>
                            <div className="table-td">
                                {product.bar_outer_diameter + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar indre diameter:
                            </div>
                            <div className="table-td">
                                {product.bar_inner_diameter + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Kuglelejer:
                            </div>
                            <div className="table-td">
                                {product.bearings}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Aksel diameter:
                            </div>
                            <div className="table-td">
                                {product.aksel + "mm"}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

