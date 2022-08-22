import { Route, Routes } from "react-router-dom";
import ChannelPage from "../ChannelPage/ChannelPage";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
    return(
        <div className="homepage">
            <NavBar />
            <Routes>
                <Route path='/channel/test111' element={<ChannelPage />}/>
            </Routes>
        </div>
    )
}

export default HomePage;
