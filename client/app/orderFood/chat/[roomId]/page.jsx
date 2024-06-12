"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ChatCard from "@/app/components/ChatCard";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import Image from "next/image";
import FavIcon from "@/public/favicon.ico";
import { useGlobals } from "@/app/contexts/Globals";
import Emoji from "@/app/components/Emoji";
import ChatDialog from "@/app/components/ChatDialog";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import Loading from "@/app/components/Loading";

const page = ({ roomId, chatUser = { unreadCount: 5 } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(-1);
  const size = useState(15);
  const [showLoading, setShowLoading] = useState(false);
  const [sendRequest, setSendRequest] = useState(true);
  const { stompClient, isTyping, setToastMessage, setIsLoggedIn } =
    useGlobals();
  const [inputValue, setInputValue] = useState("");
  const [iAmTyping, setIAmTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [chats, setChats] = useState([]);
  const lastTypingTimeRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const emojiIconRef = useRef(null);
  const chatScrollRef = useRef(null);
  const destination = "user1@gmail.com";

  useEffect(() => {
    const getAllChats = async ({ currentPage }) => {
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
              // Filter out elements from responseData that already exist in prev based on their IDs
              const filteredData = responseData.filter(
                (newItem) =>
                  !prev.some((prevItem) => prevItem.id === newItem.id)
              );
              // Merge the filtered data with the previous state
              return [...prev, ...filteredData];
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
        }
      }
    };

    if (sendRequest && page >= 0) {
      if (chats.length === 0) {
        const pageNum = Math.ceil(chatUser.unreadCount / size) - 1;
        for (let i = 0; i <= pageNum; i++) {
          getAllChats(i);
        }
      } else {
        getAllChats(page);
      }
    }
  }, [page]);

  useEffect(() => {
    const pageNum = Math.ceil(chatUser.unreadCount / size) - 1;
    setPage(pageNum);
  }, []);

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
      };
    }
  }, []);

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

  return (
    <>
      <ChatDialog />
      <div
        className="w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-[100%] grid"
        style={{ gridTemplateRows: "3.4rem auto 2.7rem" }}
      >
        <div className={`flex items-center bg-gray-700 p-1`}>
          <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
            <Image src={FavIcon} alt="logo" width={26} />
          </div>
          <p className="ml-1 text-xl text-white font-bold truncate">
            Select Food
          </p>
        </div>
        <div
          className="h-[calc(100% - .75rem)] pl-1 pr-1 mt-1 mb-2 sm:pl-4 sm:pr-4 overflow-y-auto"
          ref={chatScrollRef}
        >
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
        <form
          className="flex items-center w-full gap-2 mb-4 p-1 sm:p-4"
          encType="multipart/form-data"
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
              style={{ maxWidth: "calc(100vw - 7rem)" }}
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
                // ref={fileInputRef}
                // onChange={handleFileChange}
                accept="image/*, video/*"
              />
              <IoAttachOutline className="text-gray-400 text-[1.2rem]" />
            </div>
          </div>
          <BiSolidSend className={`text-[1.4rem] text-gray-600`} />
        </form>
      </div>
    </>
  );
};

export default page;
