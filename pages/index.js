import Head from 'next/head'
import Footer from '../components/Footer'
import { getCollectionData } from '../global/GetCollection'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../global/AuthContext'
import { useEffect, useState } from 'react'
import SignedInLinks from '../components/SignedInLinks'
import SignedOutLinks from '../components/SignedOutLinks'
import AdminLinks from '../components/AdminLinks'
import NavbarDesktop from '../components/NavbarDesktop'

export default function Home({ completes, bars, decks, wheels }) {
  const { currentUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userLinks, setUserLinks] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
            console.log(screenSize)
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [screenSize]);

    function handleBurgermenu() {
        setMenuOpen(!menuOpen)
        console.log(menuOpen)
    }

    function handleUserLinks() {
        setUserLinks(!userLinks)
        console.log(userLinks)
    }

    function handleDropdown() {
        setDropdown(!dropdown)
        console.log(dropdown)
    }



  return (
    <div>
      <header>
        <div id="logo">

        </div>
        {screenSize < 768 &&
          <button id="menu-btn" onClick={handleBurgermenu}>
              <div></div>
              <div></div>
              <div></div>
          </button>
        }
        <div id="user-tools">
            <ul id="user-tools-list">
                <li>
                <div id="profile" onClick={handleUserLinks}>
                    Profil
                </div>
                    <ul className={userLinks ? 'user-links-active' : 'user-links'}>
                        {currentUser && currentUser.email != "drescherrijna@gmail.com" &&
                            <li className="user-links-con">
                                {<SignedInLinks onClick={handleUserLinks} />}
                            </li>
                        }

                        {!currentUser &&
                            <li className="user-links-con">
                                {<SignedOutLinks onClick={handleUserLinks} />}
                            </li>
                        }

                        {currentUser && currentUser.email === "drescherrijna@gmail.com" &&
                            <li className="user-links-con">
                                {<AdminLinks onClick={handleUserLinks} />}
                            </li>
                        }
                    </ul>
                </li>
                <li>
                    <div id="cart">
                      
                    </div>
                </li>
            </ul>
        </div>
        <div id="searchbar-container">
            <input id="searchbar" type="text" placeholder="Search.."></input>
            <div id="search-result-container">
                <ul id="search-results">

                </ul>
            </div>
        </div>
        {screenSize < 768 &&
                <div id="mobil-menu-container" className={menuOpen ? 'mobil-menu-container-active' : 'mobil-menu-container'}>
                    <nav id="global-menu">
                        <ul id="menu-liste">
                            <li className="nav-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                    LØBEHJUL
                            </li>
                            <li className="nav-link" onClick={handleDropdown}>
                                DELE
                                <ul id="dropdown-liste" className={dropdown ? 'dropdown-list-active' : 'dropdown-list'}>
                                    <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            BARS
                                    </li>
                                    <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            DECKS
                                    </li>
                                    <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            HJUL
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            }

            {screenSize > 768 &&
                <NavbarDesktop />
            }
      </header>
      
        <div className="content">
          <section id="top3-section">
              <div id="top3-completes">
                  <h2>
                      TOP 3 LØBEHJUL
                  </h2>
                  <div className="top3-list">
                    {completes.slice(0,3).map((complete) => (
                            <div className="top3-col" key={complete.id}>
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
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-completes">
                  <h2>
                      TOP 3 BARS
                  </h2>
                  <div className="top3-list">
                    {bars.slice(0,3).map((bar) => (
                            <div className="top3-col" key={bar.id}>
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
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-completes">
                  <h2>
                      TOP 3 DECKS
                  </h2>
                  <div className="top3-list">
                    {decks.slice(0,3).map((deck) => (
                            <div className="top3-col" key={deck.id}>
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
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div id="top3-completes">
                  <h2>
                      TOP 3 HJUL
                  </h2>
                  <div className="top3-list">
                    {wheels.slice(0,3).map((wheel) => (
                            <div className="top3-col" key={wheel.id}>
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
                            </div>
                        ))
                    }
                  </div>
              </div>
          </section> 
        </div>

      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const completes = await getCollectionData("completes");
  const bars = await getCollectionData("bars");
  const decks = await getCollectionData("decks");
  const wheels = await getCollectionData("wheels");

  return {
    props: {
      completes: completes,
      bars: bars,
      decks: decks,
      wheels: wheels
    }
  }
}
