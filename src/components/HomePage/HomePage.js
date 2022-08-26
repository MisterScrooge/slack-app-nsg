import { useContext, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { SelectedContext} from "../../contexts/SelectedContext";
import { LoginHeaders } from "../../contexts/LoginContext";
import MainChat from "../MainChat/MainChat";
import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import { UsersContext } from "../../contexts/UsersContext";

const HomePage = () => {
    const {updateUsers} = useContext(UsersContext);
    const {channels, updateChannels} = useContext(ChannelsContext);
    const {selected, updateSelected} = useContext(SelectedContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const url = "http://206.189.91.54/api/v1";

    const retrieveUsers = async () => {
        const response = await fetch(`${url}/users`,  {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            updateUsers(data['data']);
        }
    }

    const retrieveChannels = async () => {
        const response = await fetch(`${url}/channels`, {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            updateChannels(data['data']);
        }
    }

    useEffect(() => {
        retrieveChannels();
        retrieveUsers();

        if(!selected && channels.length > 0) {
            updateSelected(channels[0]);
        }
    }, [loginHeaders]);

    return(
        <div className="homepage">
            <NavBar retrieveChannels={retrieveChannels} />
            <MainChat />
        </div>
    )
}

export default HomePage;
