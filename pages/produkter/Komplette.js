import { getCollectionData } from "../../global/GetCollection";
import Link from "next/link";
import Head from 'next/head'

export const getStaticProps = async () => {
    const completes = await getCollectionData("completes");

    return {
      props: {
        completes: completes
      }
    }
}

export default function CompletesGallery({completes}) {
    return (
        <section className="gallery-container">
            <Head>
                <title>Gisito Scooters - Løbehjul</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
                <h1>
                    LØBEHJUL
                </h1>
                <div className="underline">

                </div>
                <div className="gallery-list">
                    {   completes.map((complete) => (
                            <div className="gallery-col" key={complete.id}>
                                <Link href={'/details/komplette/' + complete.id}>
                                    <div className="gallery-item">
                                        <div className="gallery-img">
                                            <img src={complete.product_img} className="complete-img" />
                                        </div>

                                        <h3 className="gallery-title">
                                            {complete.product_name + " Løbehjul"}
                                        </h3>
                                        
                                        <p className="gallery-price">
                                            {complete.price + "kr"}
                                        </p>

                                        <p className="gallery-size">
                                            {complete.total_height + "mm"}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))   
                    }
                </div>
        </section>
    )
}

