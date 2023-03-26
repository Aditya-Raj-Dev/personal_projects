import React, { useContext, useEffect, useState } from 'react'
import {ChatContext} from "../Context/ChatProvider"

import axios from "axios"
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { Box } from '@chakra-ui/react'
import MyChats from '../components/Chats/MyChats'
import ChatBox from '../components/Chats/ChatBox'

const ChatPage = () => {
 const {user}=useContext(ChatContext)
const [fetchAgain,setFetchAgain]=useState(false)
console.log("chatpage")
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"  justifyContent="space-between"
      width="100%"   height="90vh" 
      padding="10px"
    >
         {user  && <MyChats fetchAgain={fetchAgain}/>}
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default ChatPage