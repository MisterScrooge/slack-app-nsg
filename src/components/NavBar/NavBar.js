import { useContext, useEffect } from "react";
import { ChannelsContext } from "../../contexts/ChannelsContext";
import { UsersContext } from "../../contexts/UsersContext";       // S
import { LoginHeaders } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
    const {channels, updateChannels, updateChosenChannel} = useContext(ChannelsContext);
    const {users, updateUsers} = useContext(UsersContext);      // S
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
            console.log(data['data']);
            updateChannels(data['data']);
        }
    }

    // S >>>>
    const retrieveUsers = async () => {
        const response = await fetch(`${url}/users`, {
            method: 'GET',
            headers: {
                'expiry': loginHeaders['expiry'],
                'uid': loginHeaders['uid'],
                'access-token': loginHeaders['access-token'],
                'client': loginHeaders['client']
            }
        });

        
            const data = await response.json();
            console.log(data['data']);
            updateUsers(data['data']);
        
    }
    // S <<<<

    useEffect(() => {
        retrieveChannels();
        retrieveUsers();        // S
    });

    // S
    // const chooseChannel = (id) => {
    //     console.log(`Channel id: ${id}`);
    //     setChosenChannel(id);
    //     console.log(chosenChannel)
    // }

    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">Channels</h5>
                {channels.length > 0 && channels.map((channel, i) => {
                    return (
                        <div key={channel.id} className="nav-item" onClick={() => updateChosenChannel(channel.id)}>
                            <div className="initial">{channel.name[0]}</div>
                            <Link to='/channel/test111'>{channel.name}</Link>
                        </div>
                    )
                })}
            </div>

            <div className="nav-list">
                <h5 className="nav-header">Direct Messages</h5>
                {/* {users.length > 0 && users.map((user, i) => {
                    return (
                        <div key={user.id} className="nav-item">
                            <div className="initial">{user.name[0]}</div>
                            {user.name}
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default NavBar;
