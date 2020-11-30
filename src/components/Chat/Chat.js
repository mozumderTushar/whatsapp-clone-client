import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import './Chat.css'

const Chat = ({ messages }) => {

    const [input, setInput] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();

        const details = { message: input, name: 'DEMO APP', timestamp: 'just now!', received:true }

        fetch('https://whatsapp-clone-scic.herokuapp.com/messages/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(data => console.log(data))

            setInput("");
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {
                    messages.map(message => (
                        <p className={`chat__message ${message.received} && "chat__receiver" `}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{message.timestamp}</span>
                        </p>
                    ))
                }

            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;