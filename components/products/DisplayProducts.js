import { useMainContext } from "../context/MainContext";
import Card from "./Card";
import { DEFAULT_IMG_URL } from "../../config";

const DisplayProducts = () => {
    const { filter, products, displayCards, setPopupOpen, setIdToEdit, setIdToDelete } = useMainContext()

    let productsToDisplay = [];
    if (filter === "all") {
        productsToDisplay = products
    } else if (filter === "low") {
        productsToDisplay = products.filter((item) => (item.itemQ > 0 && item.itemQ <= 10))
    } else {
        productsToDisplay = products.filter((item) => (item.itemQ === 0))
    }

    if (displayCards) {
        return (
            <>
                {productsToDisplay.map((item) => {
                    console.log("item map", item.id, item.itemName, item.itemQ, item.itemUrl);
                    return (
                        <div key={item.id} className="cards-container">
                            <Card itemName={item.itemName} itemQ={item.itemQ} id={item.id} itemUrl={item.itemUrl} />
                        </div>)
                })}
            </>
        )
    } else {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Qty</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {productsToDisplay.map((item) => {

                        return (
                            <tr key={item.id}>
                                <td>{item.itemName.toUpperCase()}</td>
                                <td><img src={item.itemUrl || DEFAULT_IMG_URL} alt={item.itemName} className="table-image" /></td>
                                <td>{item.itemQ}</td>
                                <td>
                                    <img src="/pencil2-black2.png" className="table-pen-icon" onClick={(e) => {
                                        setPopupOpen(true);
                                        setIdToEdit(item.id);
                                    }} />
                                    <img src="/cross-delete.png" className="table-cross-icon" onClick={(e) => {
                                        setPopupOpen(true);
                                        setIdToDelete(item.id);
                                    }} />
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        )
    }

}

export default DisplayProducts