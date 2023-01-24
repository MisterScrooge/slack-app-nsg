import { useContext, useState, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { SelectedContext} from "../../contexts/SelectedContext";
import { LoginHeaders } from "../../contexts/LoginContext";
import MainChat from "../MainChat/MainChat";
import NavBar from "../NavBar/NavBar";
import AddDirectMessage from "../Popup/AddDirectMessage/AddDirectMessage";
import "./HomePage.css";
import { UsersContext } from "../../contexts/UsersContext";
import { UserDMsContext } from "../../contexts/UserDMsContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const {updateUsers} = useContext(UsersContext);
    const {channels, updateChannels} = useContext(ChannelsContext);
    const {selected, updateSelected} = useContext(SelectedContext);
    const {userDMs, updateUserDMs} = useContext(UserDMsContext);
    const {loginHeaders} = useContext(LoginHeaders);
    const [isAddDMToggled, setIsAddDMToggled] = useState(false);
    const navigate = useNavigate();
    const url = "http://206.189.91.54/api/v1";

    const handleDMToggle = () => {
        if(isAddDMToggled) {
            navigate("/homepage");
        } else {
            navigate("./add-dm");
        }

        setIsAddDMToggled(!isAddDMToggled);
    }

    const retrieveUsers = async () => {
        const response = await fetch(`${url}/users`,  {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            const users = data['data'];
            updateUsers(users);

            // const demoUsers = [
            //     'nieves1@nieves.com',
            //     'nieves2@nieves.com',
            //     'shawn@gmail.com',
            //     'shawn1@shawn.com',
            //     'shawn2@shawn.com',
            //     'gene@jimil.com',
            //     'gene3@gene.com',
            //     'gene4@gene.com'
            //     ];
            // const tempUserDMs = [...userDMs];

            // for(let i = 0; i < demoUsers.length; i++) {
            //     const idx = users.findIndex(user => user.email === demoUsers[i]);

            //     const response = await fetch(`${url}/messages?receiver_id=${users[idx].id}&receiver_class=User`,  {
            //         method: 'GET',
            //         headers: {...loginHeaders}
            //     });

            //     if(response.status === 200) {
            //         const data = await response.json();
            //         const messages = data['data'];
            //         console.log(messages);

            //         if(messages.length > 0 && tempUserDMs.findIndex(user => user.email === demoUsers[i]) === -1) {
            //             tempUserDMs.push(users[idx]);
            //         }
            //     }
            // }

            // updateUserDMs([...tempUserDMs]);
        }
    }

    const retrieveRecent = async () => {
        const response = await fetch(`${url}/users/recent
        `, {
            method: 'GET',
            headers: {...loginHeaders}
        });

        if(response.status === 200) {
            const data = await response.json();
            updateUserDMs(data['data']);
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
        retrieveRecent();
    }, [loginHeaders]);

    useEffect(() => {
        if(!selected && channels.length > 0) {
            updateSelected(channels[0]);
        }
    }, [loginHeaders, channels]);

    return(
        <div className="homepage">
            {isAddDMToggled && <AddDirectMessage handleToggle={handleDMToggle} />}
            <NavBar handleDMToggle={handleDMToggle} retrieveChannels={retrieveChannels}/>
            <MainChat isAddDMToggled={isAddDMToggled} handleDMToggle={handleDMToggle}/>
        </div>
    )
}

export default HomePage;
