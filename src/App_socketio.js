import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';

//const socket =  io.connect('http://localhost:4000')
const socket =  io.connect('https://nodechatserver.nayaguny.repl.co');

function App() {
  const [state, setState] = useState({message:'', name:''})
  const [chat,setChat] =useState([])

  const [msg, setMsg] = useState("") ;
  const [idValue, setId] = useState('');
  const [soc, setSoc] = useState('');

  useEffect(()=>{
    socket.on('message',(message)=>{
        setMsg(message)
    })
  },[])




//   const renderChat =()=>{
//     return chat.map(({name, message},index)=>(
//       <div key={index}>
//         <h3>{name}:<span>{message}</span></h3>
//       </div>
//     ))
//   }

const saveUserId = event => {
    setId(event.target.value);
    // console.log(event.target.value);
  };

  const sendMsg = event => {
    console.log(idValue);
    socket.emit('message', idValue)
    //soc.send(idValue);
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