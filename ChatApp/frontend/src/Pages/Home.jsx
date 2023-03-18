import { Box, Container, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signup from '../components/Authentication/Signup'
import Login from '../components/Authentication/Login'
import { useNavigate} from "react-router-dom"

const Home = () => {
  const navigate=useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usertoken"));

    if (user){
      console.log("sdakdf")
    navigate("/chats")}
    else{
      navigate("/")
    }
  }, []);

  return (
    <Container maxW="500px" centerContent>
    <Box bg={"gray.200"}
     justifyContent="center"
     width={"100%"}
     margin="40px 0  20px 0"
     borderRadius={'md'}
     
     padding={2}>
      <Text fontSize={"2xl"}
      fontWeight="semibold"
      fontFamily="sans-serif">
        Aadi-Chat-App
      </Text>
    </Box>
    <Box bg={"white"}
     justifyContent="center"
     width={"100%"}
     margin="0 0  20px 0"
     padding="20px 10px 20px 10px"
     borderRadius={'md'}
     >
     <Tabs variant='soft-rounded' >
  <TabList>
    <Tab width="50%">Register</Tab>
    <Tab width="50%">Login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
         <Signup/>
    </TabPanel>
    <TabPanel>
        <Login/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default Home