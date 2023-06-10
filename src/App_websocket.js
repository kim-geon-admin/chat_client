import logo from './logo.svg';
import './App.css';
import {useState, useEffect }  from 'react';



function App() {

  const [msg, setMsg] = useState("") ;
  const [idValue, setId] = useState('');
  const [soc, setSoc] = useState('');

  useEffect(
    () => {
      console.log('dddf');
     // let socket = new WebSocket("ws://localhost:8001");
     let socket = new WebSocket("ws://nodechatserver.nayaguny.repl.co");
      setSoc(socket);
      socket.onopen = () => {   // 연결!
        console.log("connected!!1");
        socket.send(idValue);

        socket.onmessage = (evt) => {
          console.log(evt);
          console.log(evt.data);
          setMsg(evt.data);
        };

      };
     // 
    },[]
  );
  
  const saveUserId = event => {
    setId(event.target.value);
    // console.log(event.target.value);
  };

  const sendMsg = event => {
    soc.send(idValue);
  };

  return (
    <div className="App">
    {msg}
    <input
            className="login_id"
            type="text"
         
            value={idValue}
           onChange={saveUserId}
          />
          <button onClick={sendMsg}>등록</button>
    </div>
  );
}

export default App;
