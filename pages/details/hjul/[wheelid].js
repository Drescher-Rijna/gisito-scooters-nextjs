import { useEffect, useState } from "react";
import { useCart } from "../../../global/CartContext";
import { getCollectionData } from "../../../global/GetCollection";
import Head from 'next/head'

export const getStaticPaths = async () => {
    const wheels = await getCollectionData("wheels");

    const paths = wheels.map(wheel => {
        return {
            params: { wheelid: wheel.id.toString() }
        }
    })

    return {
      paths: paths,
      fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.wheelid;
    const wheels = await getCollectionData("wheels");
    const product = await wheels.find((wheel)=> wheel.id === id);

    return {
      props: {
        product: product
      }
    }
}

export default function WheelDetails({product}) {
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
                <title>{'Gisito Scooters - ' + product.product_name + ' Hjul'}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        <section className="details-product-options">
            <div className="product-image wheel-details-img">
                <img src={product.product_img} />
            </div>
            <img className="brand-logo" src={product.brand} />
            <h1>
                {product.product_name + " Hjul"}
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
                            {product.wheel_width + "mm"}
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-td">
                            Hjul hårdhed:
                        </div>
                        <div className="table-td">
                            {product.wheel_hardness + "A"}
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-td">
                            Hjul pr. pakke:
                        </div>
                        <div className="table-td">
                            {product.wheels_pr_pack}
                        </div>
                    </div>
                </div>
                <div className="table-column-2">
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
                            Kerne design:
                        </div>
                        <div className="table-td">
                            {product.core_design}
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
                    <div className="table-row">
                        <div className="table-td">
                            Kuglelejer:
                        </div>
                        <div className="table-td">
                            {product.bearings}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
    )
}

