import { useEffect, useState } from "react";
import { useAuth } from "../global/AuthContext";
import Image from 'next/image'
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
import NavbarDesktop from "./NavbarDesktop";
import Fuse from 'fuse.js';
import { useProducts } from "../global/ProductsContext";
import Link from 'next/link'

const Navbar = () => {
    
    const { currentUser } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userLinks, setUserLinks] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    //SEARCH
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([])
    const {completes, decks, bars, wheels} = useProducts();

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

    // SEARCH
    const handleSearch = (e) => {
        console.log("searhtype")
        const value = e.target.value;
        setSearchTerm(value)
        console.log(searchTerm)
    }

    useEffect(() => {
        console.log("searhfilter")
        console.log(searchTerm)
        const fuse = new Fuse([...completes, ...decks, ...wheels, ...bars], { threshold: 0.4, keys: ['product_name'] })
        console.log(fuse)

        const results = fuse.search(searchTerm).map(({ item }) => item);
        console.log(results)

        if (searchTerm.length > 3 && results.length > 0) {
            setData(results)
            console.log(data)
            console.log(data.length)
        } else {
            setData("")
        }
    }, [searchTerm])

    return (
        <header>
            <div id="logo">
                <Link href="/">  
                    <Image src="/logo.svg" width={50} height={20} />
                </Link>
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
                        <Image src="/profile-icon.svg" width={50} height={50} />
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
                            <Link href="/kurv">
                                <Image src="/cart-icon.svg" width={55} height={55} />
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="searchbar-container">
                <input id="searchbar" value={searchTerm} onChange={handleSearch} type="text" placeholder="Search.."></input>
                <div id="search-result-container">
                    {data.length > 0 &&
                        <ul id="search-results">
                            {data.map((item) => (
                                <Link key={item.id} href={'/details/' + item.category + '/' + item.id}>
                                    <li>
                                        <img src={item.product_img} />
                                        <p>
                                            {item.product_name}
                                        </p>
                                    </li>
                                </Link>
                            ))

                            }
                        </ul>
                    }
                </div>
            </div>
            {screenSize < 768 &&
                    <div id="mobil-menu-container" className={menuOpen ? 'mobil-menu-container-active' : 'mobil-menu-container'}>
                        <nav id="global-menu">
                            <ul id="menu-liste">
                                <li className="nav-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                    <Link href="/produkter/Komplette">LØBEHJUL</Link>
                                </li>
                                <li className="nav-link" onClick={handleDropdown}>
                                    DELE
                                    <ul id="dropdown-liste" className={dropdown ? 'dropdown-list-active' : 'dropdown-list'}>
                                        <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            <Link href="/produkter/Bars">BARS</Link>    
                                        </li>
                                        <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            <Link href="/produkter/Decks">DECKS</Link>    
                                        </li>
                                        <li className="dropdown-link" onClick={screenSize < 768 ? handleBurgermenu : undefined}>
                                            <Link href="/produkter/Hjul">HJUL</Link>     
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
    )
}

export default Navbar;