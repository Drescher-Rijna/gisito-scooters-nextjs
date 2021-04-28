import { getCollectionData } from "../../global/GetCollection";
import Link from "next/link";

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

