"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ChatCard from "@/app/components/ChatCard";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import { useGlobals } from "@/app/contexts/Globals";
import Emoji from "@/app/components/Emoji";
import ChatDialog from "@/app/components/ChatDialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import Loading from "@/app/components/Loading";
import { jwtDecode } from "jwt-decode";
import Typing from "../animations/Typing.json";
import Lottie from "lottie-react";
import { usePathname } from "next/navigation";

const ChatRoom = ({ roomId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState(-1);
  const size = 12;
  const [showLoading, setShowLoading] = useState(false);
  const [sendRequest, setSendRequest] = useState(true);
  const {
    stompClient,
    isTyping,
    setToastMessage,
    setIsLoggedIn,
    chats,
    setChats,
    showUnreadBar,
    setShowUnreadBar,
  } = useGlobals();
  const [inputValue, setInputValue] = useState("");
  const [childInput, setChildInput] = useState("");
  const [chatAttachments, setChatAttachments] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [chatToEdit, setChatToEdit] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const lastTypingTimeRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const emojiIconRef = useRef(null);
  const chatScrollRef = useRef(null);
  const [destination, setDestination] = useState("");
  const [mySelf, setMySelf] = useState({});
  const [myTarget, setMyTarget] = useState({});
  const [unseenChatCount, setUnseenChatCount] = useState(-1);
  const fileInputRef = useRef(null);

  const sendSocketNotification = (topic, chat) => {
    if (stompClient && stompClient.connected) {
      let notificationMessage = "";
      let redirectUrl;
      if (topic === "add") {
        notificationMessage = `${mySelf.name} sent you a new message`;
      } else if (topic === "reaction") {
        notificationMessage = `${mySelf.name} reacted to your message`;
      }
      if (pathname.includes("/orderFood/chat")) {
        redirectUrl = "/delivery/chat";
      } else {
        redirectUrl = `/orderFood/chat/${roomId}`;
      }

      let dataToSend = {
        title: "Chat",
        topic: topic,
        notificationMessage: notificationMessage,
        redirectUrl: redirectUrl,
      };

      if (topic === "add" || topic === "update") {
        dataToSend = {
          ...dataToSend,
          chat: {
            id: chat.id,
            roomId: chat.roomId,
          },
        };
      } else {
        dataToSend = {
          ...dataToSend,
          chat: chat,
        };
      }

      stompClient.send(
        "/user/" + destination + "/queue",
        {},
        JSON.stringify(dataToSend)
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).sub;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/chatRoomInit?roomId=${roomId}&userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          const { firstUser, secondUser, unseenCount } = response.data;
          setMySelf(firstUser);
          setMyTarget(secondUser);
          setDestination(secondUser.id);
          setUnseenChatCount(unseenCount);
          sendSocketNotification("seenAll", null);
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        } else if (error.response.status === 404) {
          setToastMessage(
            "The chat room is already dissolved as the order is delivered"
          );
          const role = localStorage.getItem("role");
          if (role === "USER") {
            router.push("/orderFood/chat");
          } else {
            router.push("/delivery");
          }
        }
      }
    };

    if (roomId >= 0) {
      fetchData();
    }
  }, [roomId]);

  useEffect(() => {
    if (unseenChatCount >= 0) {
      let pageNum = Math.ceil(unseenChatCount / size) - 1;
      pageNum = Math.max(pageNum, 0);
      setPage(pageNum);
    }
  }, [unseenChatCount]);

  useEffect(() => {
    const getAllChats = async (currentPage) => {
      console.log("currentPage:", currentPage);
      try {
        setShowLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/getChats?page=${currentPage}&size=${size}&roomId=${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status == 200) {
          setShowLoading(false);
          if (page === 0) {
            setChats(response.data);
          } else {
            const responseData = response.data;
            setChats((prev) => {
              // Merge the previous state with the new data
              const mergedData = [...prev, ...responseData];

              // Sort the merged data by id
              const sortedData = mergedData.sort((a, b) => b.id - a.id);

              // Remove duplicates by iterating through the sorted array
              const uniqueData = sortedData.filter(
                (item, index, array) =>
                  index === 0 || item.id !== array[index - 1].id
              );

              return uniqueData;
            });
          }
          if (response.data.length < size) {
            setSendRequest(false);
          }
        }
      } catch (error) {
        console.log("Error:", error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        } else if (error.response.status === 404) {
          setToastMessage(
            "The chat room is already dissolved as the order is delivered"
          );
          const role = localStorage.getItem("role");
          if (role === "USER") {
            router.push("/orderFood/chat");
          } else {
            router.push("/delivery");
          }
        }
      }
    };

    if (sendRequest && page >= 0) {
      if (chats.length === 0) {
        let pageNum = Math.ceil(unseenChatCount / size) - 1;
        pageNum = Math.max(pageNum, 0);
        for (let i = 0; i <= pageNum; i++) {
          getAllChats(i);
        }
      } else {
        getAllChats(page);
      }
    }
  }, [page]);

  const handleScroll = () => {
    const currentScrollTop = Math.abs(chatScrollRef.current.scrollTop);
    const currentScrollHeight = chatScrollRef.current.scrollHeight;
    const currentClientHeight = chatScrollRef.current.clientHeight;

    if (currentScrollHeight - (currentScrollTop + currentClientHeight) < 1) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const currentDivRef = chatScrollRef.current;

    if (currentDivRef) {
      const scrollHandler = () => handleScroll();
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
        setChats([]);
      };
    }
  }, []);

  useEffect(() => {
    if (chatAttachments.length === 0) {
      setInputValue(childInput);
    }
  }, [chatAttachments]);

  const sendTypingNotification = (typing) => {
    if (stompClient && stompClient.connected) {
      stompClient.send(
        "/user/" + destination + "/queue",
        {},
        JSON.stringify({ title: "Typing", typing })
      );
    }
  };

  useEffect(() => {
    if (iAmTyping) {
      sendTypingNotification(true);
    } else {
      sendTypingNotification(false);
    }
  }, [iAmTyping]);

  useEffect(() => {
    const timerLength = 5000;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTimeRef.current;
      if (timeDiff >= timerLength && iAmTyping) {
        setIAmTyping(false);
      }
    }, timerLength);

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [lastTypingTimeRef.current, iAmTyping]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIAmTyping(true);
    lastTypingTimeRef.current = new Date().getTime();
  };

  useEffect(() => {
    if (chatToEdit === null) {
      setInputValue("");
    }
  }, [chatToEdit]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setChatAttachments((prevFiles) => [...prevFiles, ...filesArray]);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewFiles((prevFiles) => [...prevFiles, reader.result]);
      };
    });
  };

  const handleSubmit = async (messageToSend, prevAttachments) => {
    const formData = new FormData();
    formData.append("message", messageToSend);
    chatAttachments.forEach((file) => {
      formData.append("chatAttachments", file);
    });
    formData.append("roomId", roomId);

    if (chatToEdit === null) {
      formData.append("senderId", mySelf.id);
      formData.append("receiverId", destination);
    } else {
      formData.append("id", chatToEdit.id);
      prevAttachments.forEach((file) => {
        formData.append("prevFiles", file.id);
      });
    }

    try {
      let response;
      if (chatToEdit === null) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/addChat`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/updateChat`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      if (response.status === 200) {
        setChatAttachments([]);
        setPreviewFiles([]);
        setInputValue("");
        setChildInput("");
        sendTypingNotification(false);

        if (chatToEdit === null) {
          setChats((prev) => {
            const newChat = response.data;
            return [newChat, ...prev];
          });
          if (chatScrollRef && chatScrollRef.current) {
            chatScrollRef.current.scrollTop = 0;
          }
          if (showUnreadBar) {
            setShowUnreadBar(false);
          }
          sendSocketNotification("add", response.data);
        } else {
          setChats((prev) => {
            const updatedChat = response.data;
            return prev.map((chat) =>
              chat.id === updatedChat.id ? updatedChat : chat
            );
          });
          setChatToEdit(null);
          setToastMessage("Chat updated successfully");
          sendSocketNotification("update", response.data);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      } else if (error.response.status === 404) {
        setToastMessage(
          "The chat room is already dissolved as the order is delivered"
        );
        const role = localStorage.getItem("role");
        if (role === "USER") {
          router.push("/orderFood/chat");
        } else {
          router.push("/delivery");
        }
      }
    }
  };

  return (
    <>
      {(chatAttachments.length > 0 || chatToEdit !== null) && (
        <ChatDialog
          parentInput={inputValue}
          setParentInput={setInputValue}
          setIAmTyping={setIAmTyping}
          lastTypingTimeRef={lastTypingTimeRef}
          chatAttachments={chatAttachments}
          setChatAttachments={setChatAttachments}
          previewFiles={previewFiles}
          setPreviewFiles={setPreviewFiles}
          inputValue={childInput}
          setInputValue={setChildInput}
          chatToEdit={chatToEdit}
          setChatToEdit={setChatToEdit}
          handleSubmit={handleSubmit}
        />
      )}
      <div
        className="w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-[100%] grid"
        style={{ gridTemplateRows: "3.4rem auto 2.7rem" }}
      >
        <div className={`flex items-center bg-gray-700 p-1`}>
          <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
            {myTarget.image !== undefined && (
              <img
                src={
                  myTarget.image !== null
                    ? `data:image/jpg;base64,${myTarget.image}`
                    : "/user.svg"
                }
                alt="logo"
                className="rounded-full w-[26px] h-[26px]"
              />
            )}
          </div>
          <p className="ml-1 text-xl text-white font-bold truncate">
            {myTarget.name}
          </p>
        </div>
        <div
          className="h-[calc(100% - 0.75rem)] pl-1 pr-1 mt-1 mb-2 sm:pl-4 sm:pr-4 overflow-y-auto flex flex-col-reverse"
          ref={chatScrollRef}
        >
          {isTyping ? (
            <Lottie
              animationData={Typing}
              loop={true}
              autoplay={true}
              style={{
                width: "2.8rem",
                height: "1.2rem",
                marginLeft: "0.2rem",
                marginTop: "0.2rem",
              }}
            />
          ) : (
            <></>
          )}
          {chats.map((chat, index) => (
            <div key={chat.id}>
              {index === unseenChatCount - 1 && showUnreadBar ? (
                <p className="mt-3 mb-3 w-full bg-gray-500 text-white font-sans font-bold text-sm p-1 rounded-full text-center">
                  unread messages
                </p>
              ) : (
                <></>
              )}
              <ChatCard
                key={chat.id}
                chat={chat}
                mySelf={mySelf}
                myTarget={myTarget}
                roomId={roomId}
                setChatToEdit={setChatToEdit}
                sendSocketNotification={sendSocketNotification}
              />
            </div>
          ))}
          {showLoading && (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          )}
        </div>
        <form
          className="flex items-center w-full gap-2 mb-4 p-1 sm:p-4"
          encType="multipart/form-data"
          onSubmit={async (e) => {
            e.preventDefault();
            if (inputValue === "" && chatAttachments.length === 0) {
              return;
            }
            handleSubmit(inputValue);
          }}
        >
          <div className="flex w-full relative">
            {showEmojis && (
              <div className="absolute bottom-full left-3">
                <Emoji
                  setInputValue={setInputValue}
                  inputRef={inputRef}
                  Ref={emojiIconRef}
                  setShowEmojis={setShowEmojis}
                />
              </div>
            )}
            <div
              className="flex justify-center items-center h-8 w-9 border-2 border-r-0 border-gray-500 rounded-tl-full rounded-bl-full cursor-pointer"
              onClick={() => setShowEmojis((prev) => !prev)}
              ref={emojiIconRef}
            >
              <BsEmojiSmile className="text-gray-400 text-[1.2rem]" />
            </div>
            <input
              type="text"
              className="border-2 border-gray-500 border-l-0 border-r-0 h-8 focus:outline-none focus:border-gray-500 w-auto flex-grow"
              placeholder="Type here"
              style={{ maxWidth: "calc(100vw - 7.4rem)" }}
              value={inputValue}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <div className="flex justify-center items-center h-8 w-9 border-2 border-l-0 border-gray-500 rounded-tr-full rounded-br-full">
              <input
                type="file"
                name="chatAttachments"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*, video/*"
              />
              <IoAttachOutline
                className="text-gray-400 text-[1.2rem] cursor-pointer"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`text-gray-600 ${
              chatAttachments.length === 0 && inputValue === ""
                ? "cursor-not-allowed"
                : "hover:p-[0.3rem] hover:rounded-full hover:bg-slate-300 cursor-pointer"
            }`}
          >
            <BiSolidSend className={`text-[1.4rem] text-gray-600`} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatRoom;
