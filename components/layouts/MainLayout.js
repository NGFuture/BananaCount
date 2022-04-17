import Header from "./Header";
import Footer from "./Footer";
import { MainProvider } from "../context/MainContext";

const MainLayout = ({ children }) => {
    return (
        <MainProvider>
            <div className="page-wrapper">
                <Header />
                <main className="container">
                    {children}
                </main>
                <Footer />
            </div>
        </MainProvider>
    )
}

export default MainLayout