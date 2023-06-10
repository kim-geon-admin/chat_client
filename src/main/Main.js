import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Box from '@mui/material/Box';
import Chat from './Chat.js';
import Friend from './Friend.js';
import ChattingList from './ChatRoom.js';
import { useLocation } from 'react-router-dom';
import '../App.css';

export default function Main(props) {
  const location = useLocation(); // useNavigate에서 보낸 데이터를 받을 때 사용
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState(location.state.id); //login.js에서 분기될떄 id값을 넘겨준다
  const [chatRoom, setChatRomm] = React.useState();
  const [detailValue, setDetailValue] = React.useState(''); // 채팅리스트 or 대화방



  const handleChange = (event, newValue) => {
    console.log(newValue);
    console.log('id : ',id);
    setDetailValue('');
    setValue(newValue);
  };

  return (
    <Box className='main'>
      <Box>
          <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="fullWidth" >
            <Tab icon={<PhoneIcon />} aria-label="phone" /> 
            <Tab icon={<FavoriteIcon />} aria-label="favorite" />
            <Tab icon={<PersonPinIcon />} aria-label="person" />
          
          </Tabs>
        </Box>
      <Box >      
            {
              value == 0 && <Friend userId={id} setTabNumber={setValue} setDetailValue={setDetailValue} setChatRomm ={setChatRomm} /> ||
              value == 1 && detailValue == 'chat' && <Chat userId={id} chatRoom={chatRoom} /> ||
              value == 1 && <ChattingList userId={id} setTabNumber={setValue}  setDetailValue={setDetailValue} setChatRomm ={setChatRomm} />  
            // value == 2 && <ChattingList userId={id} setTabNumber={setValue} setChatRomm ={setChatRomm} /> 
            }
      </Box>
   </Box>
  );
} 