import { useEffect, useState } from "react";
import { useAuth } from "../global/AuthContext";
import Image from 'next/image'
import SignedOutLinks from "./SignedOutLinks";
import AdminLinks from "./AdminLinks";
import NavbarDesktop from "./NavbarDesktop";


const Navbar = () => {
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
        <header>
            <div id="logo">
                <Image src="/logo.svg" width={50} height={20} />
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
                            <Image src="/cart-icon.svg" width={55} height={55} />
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
    )
}

export default Navbar;

