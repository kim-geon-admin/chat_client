import React,{useEffect,useState,useRef} from 'react';
import  '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import io from 'socket.io-client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import {axiosGet} from '../utill/getAxios';

import {conf} from '../conf/conf.js'; // 

import alarmClass from '../class/alarmClass';

const con = {padding:'0'};
const preCss = {color:'red',float:'right'};
let socket = null;

function ChatRoom(props) {
  

const scrollBox = useRef(null);
  
  const [chatRow, setChatRow] = useState([]);
  const [chatList, setChatlist] = useState([]);
  const [broadCast, setBroadCast] = useState('');



  const  iconClick = async (e) => {
      console.log(e.currentTarget.value);

      let users = e.currentTarget.value.split(',');
      //현재 접속되어있는 아이디와 다른 아이드를 친구 아이디로 셋한다
      let friend_user = '';
      for (let item of users) {
        if(props.userId != item){
          friend_user = item;
        }
      }

      let paramObj={
              room_user:props.userId,
              room_user2:friend_user
                    };

      let chatRoomInfo =   await axiosGet('/chat/getChatInfo',paramObj); 

      //대화방 정보를 가져온다
      props.setChatRomm(chatRoomInfo);
      //대화 창으로 넘어 가기 위해 값 지정 
      props.setTabNumber(1);
      props.setDetailValue('chat');
  }
  
  const  getChatList = async () =>{
    console.log(`현재 접속중인 id ${props.userId}`);
    
    let paramObj={
      id : props.userId
    }

  let result =   await axiosGet('/chat/getChatListInfo',paramObj);   
  setChatlist(result);
  
  }

  useEffect(() => {
    console.log('chatroom 최초 실행 로직');
    getChatList();

    if(socket == null || !socket.connected){
      console.log('broad socket 연결 합니다',socket);
      socket = io.connect(conf().CHAT_SERVER_URL);
     
    }

    socket.emit('enter_room', 'broadcast' ,()=>console.log(`broadcast 입장`));

    socket.on('message',(msgObj)=>{
      console.log('broadcast msgobj : ',msgObj);
 
      setBroadCast(msgObj);
    
    });

    //serversendEvent source
    //const es = new alarmClass();
    //es.addRedEvent();
  
  return () => {
    socket.disconnect();
    console.log('socket broadcast 종료 합니다');
    //es.close();
    socket = null;
  }
  }, []);

  useEffect(() => {



    chatList.forEach(function(chat) {
      if(chat.room_id == broadCast.room_id){
   
        chat.total_length  = chat.total_length + 1;
        chat.contents = JSON.stringify((JSON.parse(chat.contents)).concat(broadCast));

      }
  });
 //아마도.... 같은 변수로 인식하기 때문에 아예 깊은복사를
  setChatlist(  JSON.parse(JSON.stringify(chatList)) );

  }, [broadCast]);

   useEffect(() => {

    const chatRow = chatList.map((chat) => (
    
        <ListItem 
          key={chat.room_id}
          sx={{  padding: '0' }}
         
          >
               <ListItemButton>
                    <ListItemAvatar sx={{  width: '0vh' }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                           {/* <pre style={preCss}>{friend.friend_id}</pre>  */}

               <ListItemText
                     
                    primary={ (chat.contents != null) ? (JSON.parse(chat.contents))[chat.total_length-1].message : ''  }
                   
                  /> 
              <IconButton edge="end" value ={ chat.room_user2 +','+chat.room_user } aria-label="comments" onClick={iconClick}>
                <CommentIcon />
              </IconButton>
               </ListItemButton>
        </ListItem>
    
    ));
    setChatRow(chatRow);
     
  }, [chatList]);



  
  return (
    <>
     

        <CssBaseline />
      <Container style={con} maxWidth="false">
        <Box sx={{ bgcolor: '#cfe8fc' ,  overflow: 'auto' }} ref={scrollBox} 
          //  onScroll={onScroll}
          >
             <List sx={{  height: '70vh' }}>
                    {chatRow}
               {
            }
            </List>   

        </Box>

      </Container>
    </>
  );
}

export default ChatRoom;