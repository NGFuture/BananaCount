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

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(addingItem);
    }



    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        imageUpload(image).then(({url, imgPath}) => {
            setAddingItem({ ...addingItem, itemUrl: url, imgPath: imgPath })
        });

    };



    return (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Product name</label>
                <input type="text" className="form-control" placeholder="Enter product name" value={addingItem.itemName} onChange={(e) => {
                    setAddingItem({ ...addingItem, itemName: e.target.value });
                }} />
                <small className="form-text text-muted">3-12 symbols</small>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" placeholder="Enter quantity of product" value={addingItem.itemQ} onChange={(e) => {
                    setAddingItem({ ...addingItem, itemQ: +e.target.value });
                }} />
                <small className="form-text text-muted">Number from 0 up to 999</small>
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
