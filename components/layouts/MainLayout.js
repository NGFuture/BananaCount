import Header from "./Header";
import Footer from "./Footer";
import { useMainContext } from "../context/MainContext";
import Popup from "../popup/Popup";
import CreateForm from "../products/CreateForm";
import EditForm from "../products/EditForm";

const MainLayout = ({ children }) => {
    const {popupOpen, setPopupOpen, setIdToEdit, idToEdit} = useMainContext();
    const close = () => {
        setPopupOpen(false);
        setIdToEdit(null);
    };

    return (
            <div className="page-wrapper">
                <Header />
                <main className="container">
                    {children}
                </main>
                <Footer />
                {popupOpen && <Popup close={close}>
                {idToEdit ? <EditForm/> : <CreateForm/>}
                </Popup>}
            </div>

    )
}

export default MainLayout