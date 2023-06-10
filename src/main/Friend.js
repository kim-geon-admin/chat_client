import React,{useEffect,useState,useRef,useContext} from 'react';
import  '../App.css';
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
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import {axiosGet} from '../utill/getAxios';
import {userContext} from '../provider/userContext';



const con = {padding:'0'};
const preCss = {color:'red',float:'right'};

function Friend(props) {
  
const scrollBox = useRef(null);
 // let a = 'kg';
 // console.log(`안녕 ${a}`);
  const [chat, setChat] = useState(['aaa','bbb','ccc']);
  const [friendList, setFriendList] = useState([]);
  const [fList, setFlist] = useState([]);
  const txtField = useRef();
  const userCO  = useContext(userContext); //user class 객체

  const  iconClick = async (e) => {
      console.log(e.currentTarget.value);


      let paramObj={
             // room_user:props.userId,
              room_user:userCO.get('id'),
              room_user2:e.currentTarget.value
                    };

      let chatRoomInfo =   await axiosGet('/chat/getChatInfo',paramObj); 

      //대화방 정보를 가져온다
      props.setChatRomm(chatRoomInfo);
      //대화 창으로 넘어 가기 위해 값 지정 
      props.setTabNumber(1);
      // roomList를 보여지기 위한 값
      props.setDetailValue('chat');
  }
  
  const  getFriendList = async () =>{
    console.log(`현재 접속중인 id ${userCO.get('id')}`);
    
    let paramObj={
      id : userCO.get('id')
    }

  let result =   await axiosGet('/friend/getFriendList',paramObj);   
  setFlist(result);
  
  }

  useEffect(() => {
    getFriendList();
   
  }, []);

   useEffect(() => {


    const friendList = fList.map((friend) => (
    
        <ListItem 
          key={friend.seq}
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
                     
                    primary={friend.friend_id}
                   
                  /> 
              <IconButton edge="end" value ={friend.friend_id} aria-label="comments" onClick={iconClick}>
                <CommentIcon />
              </IconButton>
               </ListItemButton>
        </ListItem>
    
    ));
    setFriendList(friendList);
     
  }, [fList]);



  
     useEffect(() => {
 
      console.log('re렌더링');
  }, []);
  



  
  return (
    <>
     

        <CssBaseline />
      <Container style={con} maxWidth="false">
        <Box sx={{ bgcolor: '#cfe8fc' ,  overflow: 'auto' }} ref={scrollBox} 
          //  onScroll={onScroll}
          >
             <List sx={{  height: '70vh' }}>
                    {friendList}
               {/* 
               <ListItem>
                    <ListItemAvatar sx={{  width: '0vh' }}>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                           <pre style={preCss}>{msg}</pre>
                </ListItem>
                 
                <ListItem>
                  <div>
                      <pre style={preCss}>{msg}</pre>
                  
                  </div>
               </ListItem>  
             */}
            </List>   
                 {/* <ListItemText
                     sx={{ textAlign: 'right' }}
                    primary="Single-line itemdddddddd </br> ddddddddddddddd "
                   
                  />  */}

  

          
        </Box>

      </Container>
    </>
  );
}

export default Friend;