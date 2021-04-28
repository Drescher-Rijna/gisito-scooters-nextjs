import { useState } from "react";
import AddComplete from "../../components/AddComplete";
import AddDele from "../../components/AddDele";

const AddProduct = () => {
    const [option, setOption] = useState("komplete");

    const handleOption = (e) => {
        const target = e.target;
        const value = target.value;

        setOption(value)
    }

    return (
        <div id="add-product-container">
            <h1>Tilføj Produkt</h1>

            <select className="add-product-select" onChange={handleOption}>
                <option value="komplete">Komplete</option>
                <option value="dele">Dele</option>
            </select>

            { option == "komplete" && <AddComplete /> }
            { option == "dele" && <AddDele /> }
        </div>
    )
}

export default AddProduct;