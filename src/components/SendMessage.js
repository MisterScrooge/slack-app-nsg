import {useState, useContext} from 'react'
import { LoginHeaders } from '../context/LoginContext';


const SendMessage = () => {
    const {loginHeaders, updateLoginHeaders} = useContext(LoginHeaders);
    const [userMessage, setUserMessage] = useState({
        newMessage: '',
        receiverId: '',
        receiverClass: '',
        messageList: []
    })

    const { newMessage, receiverID, receiverClass, messageList } = userMessage

    const handleChangeMessage = (event) => {
        const { name, value } = event.target
        setUserMessage({ ...userMessage, [name]: value })
      }
      const handleChangeReceiverID = (event) => {
        const { name, value } = event.target
        setUserMessage({ ...userMessage, [name]: value })
      }
      const handleChangeReceiverClass = (event) => {
        const { name, value } = event.target
        setUserMessage({ ...userMessage, [name]: value })
      }

    const userData = {
        receiver_id: receiverID,
        receiver_class: receiverClass,
        body: newMessage
    }

    // const newMessage ={
    //     "receiverId": userMessage.receiverId,
    //     "receiverClass": userMessage.receiverClass,
    //     "body": userMessage.body
    // };

    const submitHandler = (e) => {
        e.preventDefault();
        let message = messageList
        message.push(newMessage)

        console.log(123)
        console.log(userData)
        console.log(loginHeaders)
        console.log(123)
        console.log(userMessage)
        
        fetch("http://206.189.91.54/api/v1/messages", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json',
                ...loginHeaders
            }
        })
        .then(res => res.json(userData))
        .then(data => console.log(data))

        setUserMessage({ ...userMessage, userMessageList: messageList, userMessage: '' })
    };


    return (
        <div>
            <h1>Send Message</h1>
            <div>
                <input
                type='number'
                placeholder='Receiver ID'
                name='receiverID'
                value={receiverID}
                onInput={handleChangeReceiverID}
                />
                <br />
                <label htmlFor='user'>User</label>
                <input type='radio' name='receiverClass' id='user' value='User' onChange={handleChangeReceiverClass} />
                <label htmlFor='class'>Class</label>
                <input type='radio' name='receiverClass' id='class' value='Class' onChange={handleChangeReceiverClass} />
            </div>

            <div>
                <input type='text' name='newMessage' value={newMessage} onChange={handleChangeMessage} />
                <button onClick={submitHandler}>Send</button>
            </div>
        </div>
    )
}

export default SendMessage