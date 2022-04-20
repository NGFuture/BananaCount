import { useMainContext } from "../context/MainContext";
import Card from "./Card";

const DisplayProducts = () => {
    const { filter, products } = useMainContext()
    let productsToDisplay = [];
    if (filter === "all") {
        productsToDisplay = products
    } else if (filter === "low") {
        productsToDisplay = products.filter((item) => (item.itemQ >0 && item.itemQ <=10))
    } else {
        productsToDisplay = products.filter((item) => (item.itemQ ===0))
    }


    return (
        <>
            {!!productsToDisplay && productsToDisplay.map((item) => {
                console.log("item map", item.id, item.itemName, item.itemQ, item.itemUrl);
                return (
                    <div key={item.id} className="cards-container">
                        <Card itemName={item.itemName} itemQ={item.itemQ} id={item.id} itemUrl={item.itemUrl} />
                    </div>)
            })}
        </>
    )
}

export default DisplayProducts