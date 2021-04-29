import { useEffect, useState } from "react";
import { useCart } from "../../../global/CartContext";
import { getCollectionData } from "../../../global/GetCollection";
import Head from 'next/head'

export const getStaticPaths = async () => {
    const bars = await getCollectionData("bars");

    const paths = bars.map(bar => {
        return {
            params: { barid: bar.id.toString() }
        }
    })

    return {
      paths: paths,
      fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.barid;
    const bars = await getCollectionData("bars");
    const product = await bars.find((bar)=> bar.id === id);

    return {
      props: {
        product: product
      }
    }
}

const BarDetails = ({ product }) => {
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
            <Head>
                <title>{'Gisito Scooters - ' + product.product_name + ' Bars'}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <section className="details-product-options">
                <div className="product-image bar-details-img">
                    <img src={product.product_img} />
                </div>
                <img className="brand-logo" src={product.brand} />
                <h1>
                    {product.product_name + " Bars"}
                </h1>
                <p>
                    {product.price + " kr"}
                </p>
                <div className="details-buttons">
                    <button className="cart-btn" onClick={handleAdd}>
                        LÆG I KURV
                    </button>
                    <button className="buynow-btn">
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
                <div className="table">
                    <div className="table-column-1">
                        <div className="table-row">
                            <div className="table-td">
                                Bar højde:
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
                                Kompatibel med:
                            </div>
                            <div className="table-td">
                                {product.compatibility}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bar materiale:
                            </div>
                            <div className="table-td">
                                {product.bar_material}
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
                    </div>
                    <div className="table-column-2">
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
                                Bar form:
                            </div>
                            <div className="table-td">
                                {product.bar_form}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                SCS ready:
                            </div>
                            <div className="table-td">
                                {product.scs_ready}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default BarDetails;