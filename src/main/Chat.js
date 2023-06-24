import React,{useEffect,useState,useRef,useContext} from 'react';
import  '../App.css';
import io from 'socket.io-client';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

import {userContext} from '../provider/userContext';
import {conf} from '../conf/conf.js'; 
import {axiosGet} from '../utill/getAxios';

const con = {padding:'0'};
const preCss = {color:'red',float:'right'};

//const socket = io.connect(conf().CHAT_SERVER_URL); // var socket = io.connect(url, { transports: ['websocket'] });
//console.log('socket 초기화');



const chatBoxCssLeft = { display:'grid',gridAutoColumns: 'minmax(10px, 0.4fr)'};
const chatBoxCssRight = { display:'grid',gridAutoColumns: 'minmax(10px, 0.4fr)', gridTemplateColumns: '1fr 1fr'};

let socket = null;
function Chat(props) {

  const userCO  = useContext(userContext); //user class 객체
  //const [userId, setUserId] = useState(props.userId); //기존
  const [userId, setUserId] = useState(userCO.get('id')); //객체값으로 변경
  const [responseChatId, setChatId] = useState();
  const [msg, setMsg] = useState({});
  const [chat, setChat] = React.useState([]);
  const [chatList, setchatList] = useState([]);
  //const [socket, setSocket] = useState(io.connect(conf().CHAT_SERVER_URL));
  const txtField = useRef();
  const scrollBox = useRef(null);
  const messageEndRef = useRef(null);

  if(socket == null || !socket.connected){
    console.log('socket 연결 합니다');
    socket = io.connect(conf().CHAT_SERVER_URL);
  }


  useEffect( ()=>{
    //console.log('socket',socket);
    //console.log('props member: ',props.member);
   // console.log('props chatRoom num : ',props.chatRoom[0]);

    getDetailContents();

    socket.emit('enter_room', props.chatRoom[0].room_id ,()=>console.log(`${props.chatRoom[0].room_id}번 입장`));

    socket.on('message',(msgObj)=>{
    //  setChat([...chat,message]);
      setMsg(msgObj);
    //  setChatId(msgObj.id);
   //  setChat(message => [...chat, message]);
    // ad(message); 
    //  console.log('수행',userId);
  });
    return () => {
      
      socket.disconnect();
      axiosGet('/exit/room',{id:userId,room_id:props.chatRoom[0].room_id});
      console.log('소켓 연결이 종료되었습니다');
    }

  },[]);


  useEffect(() => {
    console.log('rendering',msg);
    console.log('rendering msg',msg.message);

    if(msg.message !== '' && msg.message !== undefined){
      setChat([...chat,msg]);

     //setchatList(chatList);
     //console.log(chatList);

     console.log(scrollBox.current);
 
     //scrollBox.current.scrollTo({ top: 10000, behavior: "smooth" });

    // setMsg({});
    window.scrollTo({
      top: 350,
      behavior: "smooth"
    });
    } 
  }, [msg]);



  
  useEffect(() => {
 
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
     //scrollBox.current.scrollTo({ top: 10000, behavior: "smooth" });
     //scrollBox.current.scrollIntoView({ behavior: 'smooth' });
  
  }, [chat]);

  const getDetailContents = async () =>{
 
    const detailContents = await axiosGet('/chat/getDetailContents',{room_id:props.chatRoom[0].room_id});
     console.log(detailContents);
     if(detailContents !== 'fail'){
      setChat(detailContents);
     }
     

  }


  const getTxtField = (e) => {
  //   console.log(e.target.value);
      //setMsg(e.target.value);
    
  }

    const send = (e) => {
       
    let msgObj = {
      message : txtField.current.children[0].children[0].value,
      room_id : props.chatRoom[0].room_id ,
      id : userId
    }
      //txtField.current.children[0].children[0].value
     

      socket.emit('message', msgObj);
      txtField.current.children[0].children[0].value='';
    //  e.preventdefault();
    
  }

  const listRender = () => {
  
     return chat.map((chat,index) => {

          //if (chat.id === userId) {
            if (chat.id !== userId) {
              return (
              <ListItem key={index}>
                <ListItemAvatar sx={{  width: '0vh' }}>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box sx={chatBoxCssLeft}>
                  <Box>
                    <pre class='preCssLeft'>{chat.message}</pre>
                  </Box>
                </Box>
              </ListItem>
              )
          }else{ 
             return (
           
                <ListItem key={index}>
                  <ListItemText 
                  sx={{ textAlign: 'right' }}> 
                  <Box sx={chatBoxCssRight}>
                     <Box></Box>
                      <Box>
                        <pre class='preCssRight'>{chat.message}</pre>
                      </Box>
                  </Box>
                  </ListItemText>
                </ListItem>
      
            )
          }
        }
     );
  }

  function loadMoreItems(event) {
    if (event.target.scrollTop === event.target.scrollHeight) {
     //user is at the end of the list so load more items
    } 
    //console.log(event.target.scrollTop);
   
  }
  
  return (
    <>
      <CssBaseline />
      <Container  class='chatContainer' maxWidth="false">
        <Box sx={{  overflow: 'auto' }}   ref={scrollBox}  >
             <List>
                    {listRender()}
             </List>
             <Box sx={{  height: '0vh' }} ref={messageEndRef}></Box>
        </Box>

        <Box sx={{  display: 'grid', gridTemplateColumns: '8fr 2fr'
           }} >
              <TextField
                  id="outlined-multiline-static"
                  sx = {{}}
                  multiline
                  rows={4}
                  onChange = {getTxtField}
                  ref={txtField}
                  //defaultValue="Default Value"
            />
            <Button variant="contained"
                sx =  {{}}
              endIcon={<SendIcon />}
                  onClick={send}
              >
              Send
            </Button>

        </Box>
      </Container>
    </>
  );
}

export default Chat;