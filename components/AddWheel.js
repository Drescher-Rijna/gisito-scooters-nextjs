import { useState } from "react";
import { db, productStorage } from "../global/Firebase";

const AddWheel = () => {
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
        
        db.collection("wheels").add(data)
    }

    return (
        <>
            <h3>
                Tilføj Hjul
            </h3>
            <form className="product-form" onSubmit={handleSubmit} >
                <label>
                    Kategori
                </label>
                <input name="category" type="text" placeholder="hjul" onChange={dataChange} />

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
                <textarea name="description" className="description" onChange={dataChange} >

                </textarea>

                <label>
                    Tech features
                </label>
                <textarea name="tech_feature" className="tech-feature" onChange={dataChange} >
                    
                </textarea>

                <label>
                    Hjuldiameter
                </label>
                <input name="wheel_diameter" type="number" step="any" onChange={dataChange} />

                <label>
                    Hjul nav bredde
                </label>
                <input name="wheel_width" type="number" step="any" onChange={dataChange} />

                <label>
                    Hjul hårdhed
                </label>
                <input name="wheel_hardness" type="number" step="any" onChange={dataChange} />

                <label>
                    Hjul pr. pakke
                </label>
                <input name="wheels_pr_pack" type="text" onChange={dataChange} />

                <label>
                    Vægt
                </label>
                <input name="weight" type="number" step="any" onChange={dataChange} />

                <label>
                    Kerne design
                </label>
                <input name="core_design" type="text" onChange={dataChange} />
                    
                <label>
                    Aksel diameter
                </label>
                <input name="aksel" type="number" step="any" onChange={dataChange} />

                <label>
                    Kuglelejer
                </label>
                <input name="bearings" type="text" onChange={dataChange} />

                <button>
                    Tilføj
                </button>
            </form>
        </> 
    )
}

export default AddWheel;