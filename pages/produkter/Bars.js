import Link from "next/link";
import DeleGallery from "../../components/DeleNav";
import { getCollectionData } from "../../global/GetCollection";
import Head from 'next/head'

export default function BarsGallery({bars}) {
    return (
        <div>
            <Head>
                <title>Gisito Scooters - Bars</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DeleGallery />
            <section className="gallery-container">
                <h1>
                    BARS
                </h1>
                <div className="underline">

                </div>
                <div className="gallery-list">
                    {   bars.map((bar) => (
                            <div className="gallery-col" key={bar.id}>
                                <Link href={'/details/bars/' + bar.id}>
                                    <div className="gallery-item">
                                        <div className="gallery-img">
                                            <img src={bar.product_img} className="bar-img" />
                                        </div>

                                        <h3 className="gallery-title">
                                            {bar.product_name + " Bars"}
                                        </h3>
                                        
                                        <p className="gallery-price">
                                            {bar.price + "kr"}
                                        </p>

                                        <p className="gallery-size">
                                            {bar.bar_height + "mm"}
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
    const bars = await getCollectionData("bars");
  
    return {
      props: {
        bars: bars
      }
    }
}