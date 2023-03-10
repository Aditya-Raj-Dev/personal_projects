import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../Pages/Home"
import ChatPage from "../Pages/ChatPage"

const AllRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/chats" element={<ChatPage/>}/>
        </Routes>
    </div>
  )
}

export default AllRoute