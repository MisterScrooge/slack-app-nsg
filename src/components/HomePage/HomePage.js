import { SelectedProvider } from "../../contexts/SelectedContext";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
    return(
        <SelectedProvider>
            <div className="homepage">
                <NavBar />
            </div>
        </SelectedProvider>
    )
}

export default HomePage;
