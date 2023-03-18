import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  useToast,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [show, setShow] = React.useState(false);
  const [buttonloading, setButtonloading] = useState(false);
  const handleClick = () => setShow(!show);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState('')
  const toast = useToast();
  const [guestbutton,setGuestbutton]=useState(false)
  const navigate=useNavigate()



  async function handlelogin(){
    setButtonloading(true)
    if(!email  || !password){
      toast({
        title: "Please Fill All the Details",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setButtonloading(false)
      return 
    }
     try{
      const res=await axios({
        url:"http://localhost:8080/user/login",
        method:"POST",
        data:{email,password}
      })
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setButtonloading(false)
       console.log(res)
      localStorage.setItem("userInfo",JSON.stringify(res.data))
      // localStorage.setItem("username",JSON.stringify(res.data.name))
     navigate("/chats")
     }
     catch(err){
      console.log(err,"err")
      toast({
        title: `${err.response.data}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setButtonloading(false)
    }
  }

  async function handleloginasguest(){
    setGuestbutton(true)
    setEmail("eve.holt@reqres.in")
    setPassword("cityslicka")
    try{
      console.log(email)
      const res=await axios({
        url:"http://localhost:8080/user/login",
        method:"POST",
        data:{email:"eve.holt@reqres.in",password:"cityslicka"}
      })
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setGuestbutton(false)
      console.log(res.data,"k")
      localStorage.setItem("usertoken",JSON.stringify(res.data.token))
      localStorage.setItem("username",JSON.stringify(res.data.name))
    
     }
     catch(err){
      console.log(err,"err")
      toast({
        title: `${err.response.data}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setGuestbutton(false)
    }
  }

  
   
  return (
    <VStack spacing="8px">
      <FormControl>
        <FormLabel>Emali Address</FormLabel>
        <Input placeholder="Enter Your  Emali Address" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="messenger" size="md" width={"100%"}
        onClick={handlelogin} isLoading={buttonloading}
      >
        Login
      </Button>
      <Button colorScheme="red" size="md" width={"100%"}
      isLoading={guestbutton}
       onClick={handleloginasguest}
      >
        Login as Guest
      </Button>
    </VStack>
  );
};

export default Login;
