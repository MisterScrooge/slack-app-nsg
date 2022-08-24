import { useContext, useEffect } from "react";
// import { ChannelsContext } from "../../contexts/ChannelsContext";
import { LoginHeaders } from '../context/LoginContext';
// import { SelectedContext } from "../../contexts/SelectedContext";

// const NavBar = () => {
//     // const {selected, updateSelected} = useContext(SelectedContext);
//     // const {channels, updateChannels} = useContext(ChannelsContext);
//     const {loginHeaders} = useContext(LoginHeaders);
//     const url = "http://206.189.91.54/api/v1";

//     const retrieveChannels = async () => {
//         const response = await fetch(`${url}/channels`, {
//             method: 'GET',
//             headers: {
//                 'expiry': loginHeaders['expiry'],
//                 'uid': loginHeaders['uid'],
//                 'access-token': loginHeaders['access-token'],
//                 'client': loginHeaders['client']
//             }
//         });
//         const data = await response.json();
//         console.log(data)

//         // if(response.status === 200) {
//         //     const data = await response.json();
//         //     updateChannels(data['data']);
//         // }

//         const handleClickSubmit = (event) => {
//             event.preventDefault()
    
//             fetch(`${url}/users`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...loginHeaders,
//             },
//             })
//             .then((res) => res.json())
//             .then((data) => console.log(data))
//         }
//     }

//     // useEffect(() => {
//     //     retrieveChannels();
//     // });

export default function UserChannel() {
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);
    const url = 'http://206.189.91.54/api/v1'

    const handleClickSubmit = (event) => {
        event.preventDefault()

        fetch(`${url}/channels`, {
        method: 'GET',
        headers: {
            ...loginHeaders,
        },
        })
        .then((res) => res.json())
        .then((data) => console.log(data))

        fetch(`${url}/channels/3606`, {
            method: 'GET',
            headers: {
                ...loginHeaders,
            },
            })
            .then((res1) => res1.json())
            .then((data1) => console.log(data1))
    }
    return(
        // <div className="nav">
        //     <h3 className="header">Chats</h3>

        //     <div className="nav-list">
        //         <h5 className="nav-header">Channels</h5>
        //         {channels.length > 0 && channels.map((channel, i) => {
        //             return (
        //                 <div key={"channel" + channel.id}
        //                     className={selected.id === channel.id ? "nav-item selected" : "nav-item"}
        //                     onClick={() => updateSelected(channels[i])}
        //                 >
        //                     <div className="initial">{channel.name[0]}</div>
        //                     {channel.name}
        //                 </div>
        //             )
        //         })}
        //     </div>

        //     <div className="nav-list">
        //         <h5 className="nav-header">Direct Messages</h5>
        //     </div>

        // </div>
        <div>
            <button onClick={handleClickSubmit}>Get All Users</button>
        </div>
    )
}