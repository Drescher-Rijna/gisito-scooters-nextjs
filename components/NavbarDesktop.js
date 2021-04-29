import { useEffect, useState } from "react"
import Link from 'next/link'

const NavbarDesktop = () => {
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

    function handleDropdown() {
        setDropdown(!dropdown)
        console.log(dropdown)
    }

    return (
                <nav id="global-menu-desktop">
                    <ul id="menu-liste-desktop">
                        <Link href="/produkter/Komplette">
                            <li className="nav-link-desktop">
                                LØBEHJUL
                            </li>
                        </Link>
                        <li className="nav-link-desktop" onClick={handleDropdown}>
                            DELE
                            <ul id="dropdown-liste-desktop" className={dropdown ? 'dropdown-list-active' : 'dropdown-list'}>
                                <Link href="/produkter/Bars">
                                    <li className="dropdown-link-desktop">
                                        BARS
                                    </li>
                                </Link>
                                <Link href="/produkter/Decks">
                                    <li className="dropdown-link-desktop">
                                        DECKS
                                    </li>
                                </Link>
                                <Link href="/produkter/Hjul">
                                    <li className="dropdown-link-desktop">
                                        HJUL
                                    </li>
                                </Link>        
                            </ul>
                        </li>
                    </ul>
                </nav>
    ) 
}

export default NavbarDesktop;