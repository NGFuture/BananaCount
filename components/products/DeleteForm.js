import { useMainContext } from "../context/MainContext";

const DeleteForm = () => {
    const { products, idToEdit, deleteProduct} = useMainContext();

    const product = products.find((product)=> {
        return product.id === idToEdit 
    })
   const { id, itemName, itemQ, itemUrl} = product;

    // deleteProduct("LdbTRr1ZZVkDs3MFHcq9");
    
    const handleDelete = (e) => {
        deleteProduct(id)
    }

    if (product) {return (
        <div>
            <button className="btn btn-primary delete-button" type="button" onClick={handleDelete}>Confirm deletion</button>
            <div className="card one-card" >
                <h5 className="card-title text-center card-title">{itemName.toUpperCase()}</h5>
                <img src={itemUrl} className="card-img-top image-correct card-picture" alt={itemName} />
                <div className="card-body under-picture">
                    <div className="quantity">
                        <div className="card-text fw-bold card-number">{itemQ}</div>
                        {/* <div className="plus-icon" onClick={(e) => {
                            if (itemQ+1>999) {return}
                            setItemQ(itemQ + 1)
                        }}>+</div>
                        <div className="minus-icon" onClick={(e) => {
                            if (itemQ-1<0) {return}
                            setItemQ(itemQ - 1)
                        }}>-</div> */}
                    </div>
                </div>
            </div>
        </div>
    )} else {return (
        <p> Wait deleting product </p>
    ) }
} 

export default DeleteForm