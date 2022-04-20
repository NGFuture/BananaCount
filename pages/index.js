import SwitchType from "../components/products/SwitchType";
import FilterBar from "../components/products/FilterBar";
import { useMainContext } from "../components/context/MainContext";
import Card from "../components/products/Card";
import DisplayProducts from "../components/products/DisplayProducts";

const IndexPage = () => {
    const { products } = useMainContext();

    return (

        <div className="content">

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: 'Roboto', sans-serif;;
            }

            * {
            box-sizing: border-box;
            }
            `}</style>

            <div className="switch-type">
                <SwitchType />
            </div>
            <div className="filter-bar">
                <FilterBar />
            </div>
            
            <div className="products">
            <DisplayProducts />
                {/* {!!products && products.map((item) => { 
                    console.log("item map", item.id, item.itemName, item.itemQ, item.itemUrl );
                    return (
                    <div key={item.id} className="cards-container">
                        <Card itemName={item.itemName} itemQ={item.itemQ} id={item.id} itemUrl={item.itemUrl} />
                    </div>)
                })} */}
            </div>
        </div>
    )
}

export default IndexPage


{/* <style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Lobster;
  }

  * {
    box-sizing: border-box;
  }
`}</style> */}