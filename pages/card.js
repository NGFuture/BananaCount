
import { useMainContext } from "../components/context/MainContext";
import Card from "../components/products/Card";

const CardPage = () => {
    const { products } = useMainContext();
    const item = {
        id: "uBPcpAqUmsliEmyPBH8R",
        itemName: "pomegranate",
        itemQ: 5,
        itemUrl: "https://firebasestorage.googleapis.com/v0/b/bananacount-1c933.appspot.com/o/itemsPhotos%2Fpomegranate.jpg?alt=media&token=9700863d-7a8b-4a79-95b5-841070d30a80"
    }

    return (


        <div key={item.id}>
            <Card itemName={item.itemName} itemQ={item.itemQ} id={item.id} itemUrl={item.itemUrl} />
        </div>

    )
}

export default CardPage