import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

//const socket =  io.connect('http://localhost:4000')
const socket =  io.connect('https://nodechatserver.nayaguny.repl.co');


function Chat_room() {

  const st = {float:'right',width:'100%'};
  const st2 = {float:'left',width:'100%'};

  const [state, setState] = useState({message:'', name:''})
  const [chat,setChat] =useState([])

  const [msg, setMsg] = useState("");
  const [idValue, setId] = useState('');


  useEffect(()=>{
    console.log('수행1');
    socket.on('message',(message)=>{
        setMsg(message);
        console.log('수행');

       
    })
    
  },[])



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
         <Box
            sx={{
              width: '100%',
   
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
       >
          
      <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        //maxHeight: 300,
      
        maxHeight: '80%',
        '& ul': { padding: 1 },
      }}
      subheader={<li />}
    >
    <ul >
      <div > <p style={st} > ddddddddddddddddddddddd </p></div>
      </ul>
      <ul >
      <div > <p style={st2} > dd </p></div>
      </ul>
      <ul>
      dd
      </ul>
      <ul>
      dd
      </ul>
      <ul>
      dd
      </ul>
    </List>
        


      </Box>


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

export default Chat_room;