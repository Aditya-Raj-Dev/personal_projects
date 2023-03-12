import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [pic, setPic] = useState();
  const [buttonloading, setButtonloading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const toast = useToast();





function handlepic(e) {
    setButtonloading(true);
    const pic = e.target.files[0];
    if (pic === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } else if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dmlbu8jd9/image/upload",
        data: data,
      })
        .then((r) => {
          // console.log(r.data.secure_url);
          setPic(r.data.secure_url);
          setButtonloading(false);
        })
        .catch((e) => {
          toast({
            title: "Please upload your Image Again",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          setButtonloading(false);
        });
        
    }
    else{
      toast({
        title: "Picture Should be in jpeg or png",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setButtonloading(false);
    }
    
  }


  function handleform(e){
const {name,value }=e.target;
 setData({
  ...data,
  [name]:value
 })
  }


  async function handlesignup() {
    setButtonloading(true)
    if(!data.name || !data.email  || !data.password){
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
      // console.log(pic)
      let newdata
      if(pic){
         newdata={...data,pic}
        
      }
     const res=await axios({
        url:"http://localhost:8080/user/signup",
        method:"POST",
        data:pic? newdata : data
      })
      console.log(res)
      toast({
        title: "Signup Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position:"top",
      });
      setButtonloading(false)
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

  return (
    <VStack spacing="8px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input Placeholder="Enter Your Name" name="name" onChange={handleform} />
      </FormControl>
      <FormControl>
        <FormLabel>Emali Address</FormLabel>
        <Input Placeholder="Enter Your  Emali Address" name="email" onChange={handleform} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            onChange={handleform}
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
        <Input
          type="file"
          p="1.5"
          accept="image/*"
          name="pic"
          onChange={handlepic}
        />
      </FormControl>
      <Button
        colorScheme="linkedin"
        size="md"
        width={"100%"}
        isLoading={buttonloading}
        onClick={handlesignup}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
