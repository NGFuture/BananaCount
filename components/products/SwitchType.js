import { useMainContext } from "../context/MainContext";


const SwitchType = () => {
    const { setPopupOpen } = useMainContext();

    const handleAddClick = () => {
        setPopupOpen(true);
    }
      
    return (
        <div className="switch-type">
            <button type="button" className="btn add-button" onClick={handleAddClick}>+</button>
            Add Product
            SwitchType
        </div>
    )
}

export default SwitchType