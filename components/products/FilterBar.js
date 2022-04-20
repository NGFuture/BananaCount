import { useMainContext } from "../context/MainContext";


const FilterBar = () => {
    const { setFilter} = useMainContext(); 
    return (

        <div className="button-group">
            <button className="btn btn-primary all-stock" type="button" onClick={(e)=> {setFilter("all")}}>All stock</button>
            <button className="btn btn-primary low-stock" type="button" onClick={(e)=> {setFilter("low")}}>Low stock</button>
            <button className="btn btn-primary no-stock" type="button" onClick={(e)=> {setFilter("no")}}>No stock</button>
        </div>

    )
}

export default FilterBar