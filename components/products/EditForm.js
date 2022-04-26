import { useMainContext } from "../context/MainContext";
import { useState} from "react";
import { DEFAULT_IMG_URL } from "../../config";

const EditForm = () => {
    const { products, idToEdit, updateQuantaty } = useMainContext();
    const product = products.find((product) => {
        return product.id === idToEdit
    })
    const { id, itemName, itemQ: originalItemQ, itemUrl } = product;
    const imgUrl = itemUrl || DEFAULT_IMG_URL;
    const [itemQ, setItemQ] = useState(originalItemQ);
    const handleSave = (e) => {
        updateQuantaty(id, itemQ, itemName)
    }

    return (
        <div>
            <div className="card one-card" >
                <h5 className="card-title text-center card-title">{itemName.toUpperCase()}</h5>
                <img src={imgUrl} className="card-img-top image-correct card-picture" alt={itemName} />
                <div className="card-body under-picture">
                    <div className="quantity">
                        <div className="card-text fw-bold card-number">{itemQ}</div>
                        <div className="plus-icon" onClick={(e) => {
                            if (itemQ+1>999) {return}
                            setItemQ(itemQ + 1)
                        }}>+</div>
                        <div className="minus-icon" onClick={(e) => {
                            if (itemQ-1<0) {return}
                            setItemQ(itemQ - 1)
                        }}>-</div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary save-button" type="button" onClick={handleSave}>Save</button>
        </div>
    )
}

export default EditForm