import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Box from '@mui/material/Box';
import ChatRoom from './chat_room.js';
import CssBaseline from '@mui/material/CssBaseline';
import '../App.css';

export default function IconTabs() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (

    <div className="body">
       <CssBaseline />
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="fullWidth" >
      <Tab icon={<PhoneIcon />} aria-label="phone" /> 
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
     
    </Tabs>

    <Box sx={{ height: 1 }} >       
        {<ChatRoom/>}
    </Box>
    </div>
  
  );
} 