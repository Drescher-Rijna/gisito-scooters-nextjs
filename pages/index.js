import styles from '../styles/Home.module.css'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getCollectionData } from '../global/GetCollection'


export default function Home({ completes, bars, decks, wheels, allProducts }) {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    

    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
            console.log(screenSize)
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [screenSize]);

  
   

  return (
    <div>
        <Head>
        <title>Gisito Scooters</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon-logo.svg" />
        </Head>
        <div className="content">
          <section id="hero-section">
              {screenSize < 768 &&
                  <Image src="/hero-image-mobile.jpg" width={700} height={700} />
              }

                {screenSize == 768 &&
                    <Image src="/hero-image-desktop.jpg" width={1920} height={500} />
                }
              
              {screenSize > 768 &&
                  <Image src="/hero-image-desktop.jpg" width={1920} height={500} />
              }
          </section>
          <section id="top3-section" className="sm:mx-3 md:grid  md:grid-cols-2 md:mx-20">
              <div id="top3-completes" className="md: mb-12 md: px-4">
                  <h2 className="text-4xl mb-2">
                      TOP 3 LØBEHJUL
                  </h2>
                  <div className="top3-list">
                    {completes.slice(0,3).map((complete) => (
                            <div className="top3-col" key={complete.id}>
                                <Link href={'/details/komplette/' + complete.id}>
                                    <div className="top3-item">                                    
                                            <div className="top3-img">
                                              <Image src={complete.product_img} width={275} height={440} className="complete-img"/>
                                            </div>
                
                                          <h3 className="top3-title">
                                              {complete.product_name + " Deck"}
                                          </h3>
                                            
                                          <p className="top3-price">
                                                {complete.price + "kr"}   
                                          </p>                                  
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-bars" className="md: mb-12 md: px-4">
                  <h2 className="text-4xl mb-2">
                      TOP 3 BARS
                  </h2>
                  <div className="top3-list">
                    {bars.slice(0,3).map((bar) => (
                            <div className="top3-col" key={bar.id}>
                                  <Link href={'/details/bars/' + bar.id}>
                                    <div className="top3-item">                                     
                                      <div className="top3-img">
                                            <Image src={bar.product_img} width={360} height={440} className="bars-img"/>
                                          </div>
                
                                          <h3 className="top3-title">
                                              {bar.product_name + " Deck"}
                                          </h3>
                                            
                                          <p className="top3-price">
                                                {bar.price + "kr"}   
                                          </p>                                    
                                    </div>
                                  </Link>
                              </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-decks" className="md: mb-12 md: px-4">
                  <h2 className="text-4xl mb-2">
                      TOP 3 DECKS
                  </h2>
                  <div className="top3-list">
                    {decks.slice(0,3).map((deck) => (
                            <div className="top3-col" key={deck.id}>
                                <Link href={'/details/decks/' + deck.id}>
                                    <div className="top3-item">
                                          <div className="top3-img">
                                            <Image src={deck.product_img} width={440} height={181} className="deck-img"/>
                                          </div>

                                          <h3 className="top3-title">
                                              {deck.product_name + " Deck"}
                                          </h3>
                                            
                                          <p className="top3-price">
                                                {deck.price + "kr"}   
                                          </p>
                                      </div>
                                  </Link>
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-hjul" className="md: mb-12 md: px-4">
                  <h2 className="text-4xl mb-2">
                      TOP 3 HJUL
                  </h2>
                  <div className="top3-list">
                    {wheels.slice(0,3).map((wheel) => (
                            <div className="top3-col" key={wheel.id}>
                              <Link href={'/details/hjul/' + wheel.id}>
                                    <div className="top3-item">
                                          <div className="top3-img">
                                            <Image src={wheel.product_img} width={440} height={440} className="wheel-img"/>
                                          </div>
                
                                          <h3 className="top3-title">
                                              {wheel.product_name + " Deck"}
                                          </h3>
                                            
                                          <p className="top3-price">
                                                {wheel.price + "kr"}   
                                          </p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                  </div>
              </div>
          </section> 
        </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const completes = await getCollectionData("completes");
  const bars = await getCollectionData("bars");
  const decks = await getCollectionData("decks");
  const wheels = await getCollectionData("wheels");
  const allProducts = {...completes, ...bars, ...decks, ...wheels};

  return {
    props: {
      completes: completes,
      bars: bars,
      decks: decks,
      wheels: wheels,
      allProducts: allProducts
    }
  }
}
