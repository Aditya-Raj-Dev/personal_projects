import React, { useEffect } from 'react'
import axios from "axios"

const ChatPage = () => {


  const fetchdata=async()=>{
  const data=  await axios.get("http://localhost:8080")
  console.log(data.data)
  }

  useEffect(()=>{
fetchdata()
  },[])
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage