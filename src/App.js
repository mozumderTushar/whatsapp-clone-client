import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { useEffect, useState } from 'react';
import Pusher from "pusher-js"

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('https://whatsapp-clone-scic.herokuapp.com/messages/sync')
    .then(response => response.json())
    .then(data => setMessages(data))
  }, [])

  useEffect(() => {
    const pusher = new Pusher('27751498ccec5fb1e977', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
