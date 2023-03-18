import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { BiChevronDown, BiSearchAlt2 } from 'react-icons/bi';
import { BellIcon } from '@chakra-ui/icons'
import { ChatContext } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

  import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from './ChatLoading';

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const navigate=useNavigate()
    const toast=useToast()

   const {user}=useContext(ChatContext)

   function logouthandler(){
    localStorage.removeItem("userInfo")
navigate("/")
   }

   const handlesearch=()=>{
     if(!search){
        toast({
            title:"Please Enter something to search",
            status:"warning",
            duration:3000,
            isClosable:true,
            position:"top-left"
        })
        return
     }

     try{
        setLoading(true)
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
       axios.get(`http://localhost:8080/user/search?search=${search}`,config)
       .then((r)=>{
        setLoading(false)
        console.log(r.data)
        setSearchResult(r.data)
       })
     }
     catch(e){
        toast({
            title:"Something Went Wrong",
            status:"error",
            duration:3000,
            isClosable:true,
            position:"bottom-left"
        })
     }
   }

  return (
    <>
    <Box
     display="flex"
     justifyContent="space-between"
     alignItems="center"
     backgroundColor="white"
     width="100%"
     padding="5px 10px 5px 10px"
     borderWidth="5px"
    >
        <Tooltip label="search User To chat" hasArrow placement='bottom-end'>
            <Button variant="ghost"
            onClick={onOpen}>
            
            <BiSearchAlt2 fontSize="20px"/>
                <Text
            display={{base:"none",md:"flex"}}
            px="4px"
         
            >Search user</Text></Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="sans-serif">
           Aadi-Chat-App
        </Text>
        <Box>
        <Menu>
            <MenuButton  padding={1}>
                   <BellIcon fontSize="2xl" margin={1}/>
            </MenuButton>
        </Menu>
        <Menu>
             <MenuButton  as={Button} rightIcon={<BiChevronDown/>}>
              <Avatar  size="sm" cursor="pointer"  src={user.pic}/>
            </MenuButton> 
            <MenuList>
                <ProfileModal user={user}>
                 <MenuItem> My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider/>
                <MenuItem onClick={logouthandler}>Logout</MenuItem>
            </MenuList>
        </Menu>
        </Box>
    </Box>


      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
       <DrawerHeader>Search User</DrawerHeader>
      <DrawerBody>
        <Box display="flex" >
        <Input 
        placeholder='Search by name or email' 
        mr={2} value={search} onChange={(e)=>setSearch(e.target.value)}/>
           <Button onClick={handlesearch}>Go</Button>
     </Box>
        {loading ? <ChatLoading/> :
        (
            searchResult?.map((user)=>(
                <
            ))
        )}
       </DrawerBody>
      </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer