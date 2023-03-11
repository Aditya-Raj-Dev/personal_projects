import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    pic:""

  })

  function handlepic(e){
   const pic=e.target.files[0]
    const data=new FormData();
  
    fetch("https://api.cloudinary.com/v1_1/dmlbu8jd9/image/upload",
{    method:"post",body:data})
.then((r)=>r.json())
.then((r)=>console.log(r))
.catch((e)=>console.log(e))
  }
  return (
    <VStack spacing="8px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input Placeholder="Enter Your Name" />
      </FormControl>
      <FormControl>
        <FormLabel>Emali Address</FormLabel>
        <Input Placeholder="Enter Your  Emali Address" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
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

      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" p="1.5" accept="image/*"  onChange={handlepic}/>
      </FormControl>
      <Button colorScheme="linkedin" size="md" width={"100%"}>
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
