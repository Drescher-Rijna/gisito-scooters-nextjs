import Link from "next/link";

const DeleGallery = () => {
    return (
        <div id="dele-gallery-navigation">
            <nav>
                <Link href="/produkter/Bars">
                    <div className="dele-nav-link">
                        Bars
                    </div>
                </Link>
                <Link href="/produkter/Decks">
                    <div className="dele-nav-link">
                        Decks
                    </div>
                </Link>
                <Link href="/produkter/Hjul">
                    <div className="dele-nav-link">
                        Hjul
                    </div>
                </Link>
            </nav>
        </div>
    )
}

export default DeleGallery;