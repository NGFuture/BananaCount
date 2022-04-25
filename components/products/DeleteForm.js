import { useMainContext } from "../context/MainContext";

const DeleteForm = () => {
    const { products, idToDelete, deleteProduct } = useMainContext();

    const product = products.find((product) => {
        return product.id === idToDelete
    })
    if (!product) {
        return (
            <p>Loading...</p>)
    }
    const { id, itemName, itemQ, itemUrl } = product;

    const handleDelete = (e) => {
        deleteProduct(id)
    }
    return (
        <div>
            <button className="btn btn-primary delete-button" type="button" onClick={handleDelete}>Confirm deletion</button>
            <div className="card one-card" >
                <h5 className="card-title text-center card-title">{itemName.toUpperCase()}</h5>
                <img src={itemUrl} className="card-img-top image-correct card-picture" alt={itemName} />
                <div className="card-body under-picture">
                    <div className="quantity">
                        <div className="card-text fw-bold card-number">{itemQ}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteForm