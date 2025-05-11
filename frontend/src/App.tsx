import { Route, Routes } from "react-router-dom";
import ImgConverter from "./components/ImageConverter/ImgConverter";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<ImgConverter />} />
        </Routes>
    );
};

const App = () => {
    return (
        <>
            <Navbar />
            <Routers />
            <Footer />
        </>
    );
};

export default App;
