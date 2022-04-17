import SwitchType from "../components/products/SwitchType";
import FilterBar from "../components/products/FilterBar";

const IndexPage = () => {
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
                Products
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