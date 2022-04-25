import Header from "./Header";
import Footer from "./Footer";
import { useMainContext } from "../context/MainContext";
import Popup from "../popup/Popup";
import CreateForm from "../products/CreateForm";
import EditForm from "../products/EditForm";
import DeleteForm from "../products/DeleteForm";

const MainLayout = ({ children }) => {
    const {popupOpen, setPopupOpen, setIdToEdit, idToEdit, themeSun, setIdToDelete, idToDelete} = useMainContext();
    const close = () => {
        setPopupOpen(false);
        setIdToEdit(null);
        setIdToDelete(null);     
    };

    return (
            <div className={`page-wrapper ${themeSun ? '' : "theme-dark"}`}>
                <Header />
                <main className="container">
                    {children}
                </main>
                <Footer />
                {popupOpen && <Popup close={close}>
                {idToDelete && <DeleteForm/>}
                {!idToDelete && idToEdit && <EditForm/>} 
                {!idToDelete && !idToEdit && <CreateForm/>}            
                {/* {!idToDelete && idToEdit ? <EditForm/> : <CreateForm/>} */}
                </Popup>}
            </div>

    )
}

export default MainLayout