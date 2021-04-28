import { useState } from "react";
import AddBar from "./AddBar";
import AddDeck from "./AddDeck";
import AddWheel from "./AddWheel";

const AddDele = () => {
    const [option, setOption] = useState("bars");

    const handleOption = (e) => {
        const target = e.target;
        const value = target.value;

        setOption(value)
    }

    return (
        <div id="add-dele-container">
            <h2>Tilføj Dele</h2>

            <select className="add-product-select" onChange={handleOption}>
                <option value="bars">Bars</option>
                <option value="decks">Decks</option>
                <option value="wheels">Hjul</option>
            </select>

            { option == "bars" && <AddBar /> }
            { option == "decks" && <AddDeck /> }
            { option == "wheels" && <AddWheel /> }
        </div>
    )
}

export default AddDele;