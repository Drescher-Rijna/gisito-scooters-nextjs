import { useState } from "react";
import { db, productStorage } from "../global/Firebase";

const AddDeck = () => {
    const [error, setError] = useState(null)
    const [data, setData] = useState([])


    const dataChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const number = target.type;

        if (number === "number") {
            setData({...data, [name]: Number(value)})
        } else {
            setData({...data, [name]: value})
        }  
    }

    const handleFile = (event) => {
        const target = event.target;
        const value = target.files[0];
        const name = target.name;

        console.log(value);

        const storageRef = productStorage.ref(value.name);

        storageRef.put(value).on('state_changed', (snap) => {
            console.log(snap)
        }, (err) => {
            console.log(err)
        }, async () => {
            const url = await storageRef.getDownloadURL();
            console.log(url)
            setData({...data, [name]: url})
        });
    }


    
    const handleSubmit = async () => {
        
        db.collection("decks").add(data)
    }


    return (
        <>
            <h3>
                Tilføj Deck
            </h3>
            <form className="product-form" onSubmit={handleSubmit}>
                <label>
                    Kategori
                </label>
                <input name="category" type="text" placeholder="decks" onChange={dataChange} />

                <label>
                    Brand logo
                </label>
                <input name="brand" type="file" onChange={handleFile} />

                <label>
                    Produktnavn
                </label>
                <input name="product_name" type="text" onChange={dataChange} />

                <label>
                    Pris
                </label>
                <input name="price" type="number" step="any" onChange={dataChange} />

                <label>
                    Produktbilled
                </label>
                <input name="product_img" type="file" onChange={handleFile} />

                <label>
                    Beskrivelse
                </label>
                <textarea name="description" className="description" onChange={dataChange}>

                </textarea>

                <label>
                    Tech features
                </label>
                <textarea name="tech_feature" className="tech-feature" onChange={dataChange}>
                    
                </textarea>

                <label>
                    Deck bredde
                </label>
                <input name="deck_width" type="number" step="any" onChange={dataChange} />

                <label>
                    Deck Længde
                </label>
                <input name="deck_length" type="number" step="any" onChange={dataChange} />

                <label>
                    Hjuldiameter
                </label>
                <input name="wheel_diameter" type="number" step="any" onChange={dataChange} />

                <label>
                    Hjul nav bredde
                </label>
                <input name="wheel_nav_width" type="number" step="any" onChange={dataChange} />

                <label>
                    Vægt
                </label>
                <input name="weight" type="number" step="any" onChange={dataChange} />
                    
                <label>
                    Headtube vinkel
                </label>
                <input name="headtube_angle" type="number" step="any" onChange={dataChange} />

                <label>
                    Headtube længde
                </label>
                <input name="headtube_length" type="number" step="any" onChange={dataChange} />

                <label>
                    Deck spacers
                </label>
                <input name="deck_spacers" type="text" onChange={dataChange} />

                <label>
                    Bremse/Fender
                </label>
                <input name="brake" type="text" onChange={dataChange} />

                <label>
                    Bremse monteringbolt
                </label>
                <input name="brake_bolt" type="text" onChange={dataChange} />

                <label>
                    Aksel diameter
                </label>
                <input name="aksel" type="number" step="any" onChange={dataChange} />

                <label>
                    Griptape
                </label>
                <input name="griptape" type="text" onChange={dataChange} />

                <button type="submit">
                    Tilføj
                </button>
            </form>
        </>   
    )
}

export default AddDeck;