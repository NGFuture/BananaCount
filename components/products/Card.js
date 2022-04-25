import { useMainContext } from "../context/MainContext";


const Card = ({ id, itemName, itemQ, itemUrl }) => {

    const { setPopupOpen, setIdToEdit, setIdToDelete } = useMainContext();
    let color = "#FFA500";
    if (itemQ < 1) { color = "#FF0000" };
    if (itemQ > 10) { color = "#6DB784" };

    return (
        <div>
            <div className="card one-card" >
                <h5 className="card-title text-center card-title">{itemName.toUpperCase()}</h5>
                <img src={itemUrl} className="card-img-top image-correct card-picture" alt={itemName} />
                <div className="card-body under-picture">
                    <div className="quantity" style={{ backgroundColor: color }}>
                        <div className="card-text fw-bold card-number" >{itemQ}</div>
                        <img src="/pencil2-black2.png" className="pen-icon" onClick={(e) => {
                            setPopupOpen(true);
                            setIdToEdit(id);
                        }} />
                        <img src="/cross-delete.png" className="cross-icon" onClick={(e) => {
                            setPopupOpen(true);
                            setIdToDelete(id);
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card