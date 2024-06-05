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

const page = () => {
  const { stompClient, isTyping } = useGlobals();
  const [inputValue, setInputValue] = useState("");
  const [iAmTyping, setIAmTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const lastTypingTimeRef = useRef(0);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const emojiIconRef = useRef(null);
  const destination = "user1@gmail.com";

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
    <div
      className="w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-[100%] grid"
      style={{ gridTemplateRows: "3.4rem auto 2.7rem" }}
    >
      <div className={`flex items-center bg-gray-700 p-1`}>
        <div className="bg-white p-[0.5rem] flex justify-center items-center mr-2 rounded-full border-[1px] border-solid border-gray-500">
          <Image src={FavIcon} alt="logo" width={26} />
        </div>
        <p className="ml-1 text-xl text-white font-bold">Select Food</p>
      </div>
      <div className="h-[calc(100% - .75rem)] pl-1 pr-1 mt-1 mb-2 sm:pl-4 sm:pr-4 overflow-y-auto">
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
      <form
        className="flex items-center w-full gap-2 mb-4 p-1 sm:p-4"
        encType="multipart/form-data"
        // style={{ width: "calc(100% - 1.5rem)" }}
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
          <div
            className="flex justify-center items-center h-8 w-9 border-2 border-l-0 border-gray-500 rounded-tr-full rounded-br-full"
            // onClick={() => fileInputRef.current.click()}
          >
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
        <BiSolidSend
          className={`text-[1.4rem] text-gray-600`}
          // onClick={handleSubmitChat}
        />
      </form>
    </div>
  );
};

export default page;
