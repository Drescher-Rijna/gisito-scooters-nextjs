import { useEffect, useState } from "react";
import { useCart } from "../../../global/CartContext";
import { getCollectionData } from "../../../global/GetCollection";
import Head from 'next/head'

export const getStaticPaths = async () => {
    const decks = await getCollectionData("decks");

    const paths = decks.map(deck => {
        return {
            params: { deckid: deck.id.toString() }
        }
    })

    return {
      paths: paths,
      fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.deckid;
    const decks = await getCollectionData("decks");
    const product = await decks.find((deck)=> deck.id === id);

    return {
      props: {
        product: product
      }
    }
}

export default function DeckDetails({product}) {
    const {shoppingCart, dispatch} = useCart();
    const [product_name, setProduct_Name] = useState('');
    const [product_img, setProduct_Img] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false)

    const handleAdd = () => {
        console.log("handeling add")
        dispatch({ type: 'ADD_PRODUCT', product: { productId: product.id, category: product.category, product_name: product.product_name, product_img: product.product_img, price: product.price }});
        setProduct_Name('');
        setProduct_Img('');
        setPrice('');
        setLoading(true)
    }

    return (
        <section className="details-page">
            <Head>
                <title>{'Gisito Scooters - ' + product.product_name + ' Deck'}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <section className="details-product-options">
                <div className="product-image deck-details-img">
                    <img src={product.product_img} />
                </div>
                <img className="brand-logo" src={product.brand} />
                <h1>
                    {product.product_name + " Deck"}
                </h1>
                <p>
                    {product.price + " kr"}
                </p>
                <div className="details-buttons">
                    <button className={loading ? 'cart-btn-active' : 'cart-btn'} disabled={loading} onClick={handleAdd} >
                        {!loading && "L??G I KURV"}
                        {loading && <p>LAGT I KURV &#10003;</p>}
                    </button>
                    <button className="buynow-btn" >
                        K??B NU
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
                {product.tech_feature && <h3>
                Tech feature
            </h3>}
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
                                Deck l??ngde:
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
                                V??gt:
                            </div>
                            <div className="table-td">
                                {product.weight + "g"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Headtube vinkel:
                            </div>
                            <div className="table-td">
                                {product.headtube_angle + "??"}
                            </div>  
                        </div>
                    </div>
                    <div className="table-column-2">
                        <div className="table-row">
                            <div className="table-td">
                                Headtube l??ngde:
                            </div>
                            <div className="table-td">
                                {product.headtube_length + "mm"}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Deck spacers:
                            </div>
                            <div className="table-td">
                                {product.deck_spacers}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bremse/Fender:
                            </div>
                            <div className="table-td">
                                {product.brake}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-td">
                                Bremse monteringsbolt:
                            </div>
                            <div className="table-td">
                                {product.brake_bolt}
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
                                Griptape:
                            </div>
                            <div className="table-td">
                                {product.griptape}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

