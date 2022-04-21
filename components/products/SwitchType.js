import { useMainContext } from "../context/MainContext";


const SwitchType = () => {
    const { setPopupOpen, displayCards, setDisplayCards } = useMainContext();

    const handleAddClick = () => {
        setPopupOpen(true);
    }

    return (
        <div className="switch-type">
            <div>
                <button type="button" className="btn add-button" onClick={handleAddClick}>+</button>
                Add Product
            </div>
            <div className="switcher">
                Table
                <div className="form-check form-switch">
                    <input className="form-check-input switch-cards" type="checkbox" id="flexSwitchCheckChecked" defaultChecked value={displayCards} onChange={(e)=>{
                        setDisplayCards(!displayCards)
                    }}/>
                    <label className="form-check-label ms-2" htmlFor="flexSwitchCheckChecked">Cards</label>
                </div>
            </div>
        </div>
    )
}

export default SwitchType