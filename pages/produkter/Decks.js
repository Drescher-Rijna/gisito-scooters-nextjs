import Link from "next/link";
import DeleGallery from "../../components/DeleNav";
import { getCollectionData } from "../../global/GetCollection";

export default function DecksGallery({decks}) {
    return (
        <div>
            <DeleGallery />
            <section className="gallery-container">
                <h1>
                    DECKS
                </h1>
                <div className="underline">

                </div>
                <div className="gallery-list">
                    {   decks.map((deck) => (
                            <div className="gallery-col" key={deck.id}>
                                <Link href={'/details/decks/' + deck.id}>
                                    <div className="gallery-item">
                                        <div className="gallery-img">
                                            <img src={deck.product_img} className="deck-img" />
                                        </div>

                                        <h3 className="gallery-title">
                                            {deck.product_name + " Deck"}
                                        </h3>
                                        
                                        <p className="gallery-price">
                                            {deck.price + "kr"}
                                        </p>

                                        <p className="gallery-size">
                                            {deck.deck_length + "cm"}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))   
                    }
                </div>
            </section>
        </div>  
    )
}

export const getStaticProps = async () => {
    const decks = await getCollectionData("decks");

    return {
      props: {
        decks: decks
      }
    }
}