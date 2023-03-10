import React from "react";
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
        <Input type="file" p="1.5" accept="image/*" />
      </FormControl>
      <Button colorScheme="linkedin" size="md" width={"100%"}>
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
