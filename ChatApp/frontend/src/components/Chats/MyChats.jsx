import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import ChatLoading from "../miscellaneous/ChatLoading";
import { getSender } from "../miscellaneous/config/ChatLogic";
import GroupChatModel from "../miscellaneous/GroupChatModel";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, chats, setChats, selectedChat, setSelectedChat } =
    useContext(ChatContext);

  const toast = useToast();

  const FetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:8080/chats", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    FetchChats();
  }, []);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="sans-serif"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize={{ base: "17px", md: "14px", lg: "27px" }}>
          My Chats
        </Heading>
        <GroupChatModel>
          <Button
            display="flex"
            padding={{ base: "17px", md: "5px", lg: "17px" }}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chats
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        padding={3}
        bg="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowy="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
