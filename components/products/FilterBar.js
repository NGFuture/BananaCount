import { useMainContext } from "../context/MainContext";


const FilterBar = () => {
    const { setFilter, filter} = useMainContext(); 
    return (

        <div className={`button-group ${filter}`}>
            <button className="btn btn-primary shadow-none all-stock" type="button" onClick={(e)=> {setFilter("all")}}>All stock</button>
            <button className="btn btn-primary shadow-none low-stock" type="button" onClick={(e)=> {setFilter("low")}}>Low stock</button>
            <button className="btn btn-primary shadow-none no-stock" type="button" onClick={(e)=> {setFilter("no")}}>No stock</button>
        </div>

    )
}

export default FilterBar