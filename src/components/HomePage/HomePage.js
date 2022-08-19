import { SelectedProvider } from "../../contexts/SelectedContext";
import MainChat from "../MainChat/MainChat";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
    return(
        <SelectedProvider>
            <div className="homepage">
                <NavBar />
                <MainChat />
            </div>
        </SelectedProvider>
    )
}

export default HomePage;
