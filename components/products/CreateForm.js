import { useMainContext } from "../context/MainContext";
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const CreateForm = () => {

    const { createProduct, imageUpload } = useMainContext();
    const [imageUrl, setImageUrl] = useState(null);
    const [progress, setProgress] = useState("getUpload");
    const [addingItem, setAddingItem] = useState({
        itemName: "",
        itemQ: 1,
        itemUrl: "",
        imgPath: "",
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (addingItem.itemName.length > 12 || addingItem.itemName.length < 3) {
            newErrors.itemName = "Item name should be 3-12 symbols length"
        }
        if (addingItem.itemQ < 1 || addingItem.itemQ > 999) {
            newErrors.itemQ = "Quantity should be between 1 and 999"
        }
        if (Object.keys(newErrors).length) { setErrors(newErrors) }
        else {
            createProduct(addingItem);
        }

    }



    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        imageUpload(image).then(({ url, imgPath }) => {
            setAddingItem({ ...addingItem, itemUrl: url, imgPath: imgPath })
        });

    };

    const resetError = (property) => {
        if (!!errors[property]) {
            const newErrors = { ...errors }; //making copy of object
            delete newErrors[property];
            setErrors(newErrors)
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Product name</label>
                <input type="text" className="form-control" placeholder="Enter product name" value={addingItem.itemName} onChange={(e) => {
                    resetError("itemName");
                    setAddingItem({ ...addingItem, itemName: e.target.value });
                }} />
                <small className="form-text text-muted">3-12 symbols</small>
                {!!errors.itemName && <p className="text text-danger">{errors.itemName}</p>}
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" placeholder="Enter quantity of product" value={addingItem.itemQ} onChange={(e) => {
                    resetError("itemQ");
                    setAddingItem({ ...addingItem, itemQ: +e.target.value });
                }} />
                <small className="form-text text-muted">Number from 0 up to 999</small>
                {!!errors.itemQ && <p className="text text-danger">{errors.itemQ}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="ImageOfProduct">Image Of Product </label>
                <input type="file" className="form-control-file" onChange={(e) => {
                    handleImageUpload(e);
                }} />
            </div>


            <button type="submit" className="btn btn-primary submit-button" >Submit</button>
        </form>
    );
}

export default CreateForm
