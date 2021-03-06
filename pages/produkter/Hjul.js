import Link from "next/link";
import DeleGallery from "../../components/DeleNav";
import { getCollectionData } from "../../global/GetCollection";
import Head from 'next/head'

export default function WheelsGallery({wheels}) {
    return (
        <div>
            <Head>
                <title>Gisito Scooters - Hjul</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DeleGallery />
            <section className="gallery-container">
                <h1>
                    HJUL
                </h1>
                <div className="underline">

                </div>
                <div className="gallery-list">
                    {   wheels.map((wheel) => (
                            <div className="gallery-col" key={wheel.id}>
                                <Link href={'/details/hjul/' + wheel.id}>
                                    <div className="gallery-item">
                                        <div className="gallery-img">
                                            <img src={wheel.product_img} className="wheel-img" />
                                        </div>

                                        <h3 className="gallery-title">
                                            {wheel.product_name + " Hjul"}
                                        </h3>
                                        
                                        <p className="gallery-price">
                                            {wheel.price + "kr"}
                                        </p>

                                        <p className="gallery-size">
                                            {wheel.wheel_diameter + "mm"}
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
    const wheels = await getCollectionData("wheels");
  
    return {
      props: {
        wheels: wheels
      }
    }
}