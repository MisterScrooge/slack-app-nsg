import { useContext, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { SelectedContext} from "../../contexts/SelectedContext";
import { LoginHeaders } from "../../contexts/LoginContext";
import MainChat from "../MainChat/MainChat";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
    const {channels, updateChannels} = useContext(ChannelsContext);
    const {selected, updateSelected} = useContext(SelectedContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const url = "http://206.189.91.54/api/v1";

    const retrieveChannels = async () => {
        const response = await fetch(`${url}/channels`, {
            method: 'GET',
            headers: {
                'expiry': loginHeaders['expiry'],
                'uid': loginHeaders['uid'],
                'access-token': loginHeaders['access-token'],
                'client': loginHeaders['client']
            }
        });

        if(response.status === 200) {
            const data = await response.json();
            updateChannels(data['data']);
        }
    }

    useEffect(() => {
        retrieveChannels();

        if(selected.id === 0) {
            updateSelected(channels[0]);
        }
    });

    return(
        <div className="homepage">
            <NavBar />
            <MainChat />
        </div>
    )
}

export default HomePage;
