import { useEffect, useState } from "react"

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
                        <li className="nav-link-desktop">
                            LØBEHJUL
                        </li>
                        <li className="nav-link-desktop" onClick={handleDropdown}>
                            DELE
                            <ul id="dropdown-liste-desktop" className={dropdown ? 'dropdown-list-active' : 'dropdown-list'}>
                                <li className="dropdown-link-desktop">
                                    BARS
                                </li>
                                <li className="dropdown-link-desktop">
                                    DECKS
                                </li>
                                <li className="dropdown-link-desktop">
                                    HJUL
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
    ) 
}

export default NavbarDesktop;