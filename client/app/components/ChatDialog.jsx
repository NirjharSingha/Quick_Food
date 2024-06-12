"use client";

import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Emoji from "./Emoji";

const ChatDialog = () => {
  const [showEmojis, setShowEmojis] = useState(true);
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100svh] bg-slate-200 bg-opacity-70 z-10 flex justify-center items-center">
      <div className="w-full max-w-[430px] rounded bg-white shadow-md shadow-gray-500 max-h-[100svh]">
        <div className="w-full h-[2.3rem] bg-slate-500 flex items-center justify-end rounded-t">
          <div className="font-bold text-sm text-white h-[1.8rem] w-[1.8rem] mr-2 hover:bg-red-600 hover:rounded-full flex justify-center items-center cursor-pointer">
            X
          </div>
        </div>
        <div className="w-full pl-1 pr-1 mt-1 mb-1">
          <div className="w-full h-[7rem] flex overflow-x-auto gap-2">
            <div className="min-w-[8rem] h-full bg-slate-200 relative rounded">
              <div className="absolute top-0 right-0 w-[1.5rem] h-[1.5rem] bg-gray-400 hover:bg-gray-500 rounded-full text-white flex justify-center items-center cursor-pointer text-sm">
                x
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-2 mb-1 mt-2">
          <button className="ml-auto text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.1rem] px-2 rounded-sm">
            Add File
          </button>
        </div>
        <form
          className="flex items-center w-full mb-1 p-1 relative"
          encType="multipart/form-data"
        >
          {showEmojis && (
            <div className="absolute bottom-full right-3">
              <Emoji
                // setInputValue={setInputValue}
                // inputRef={inputRef}
                // Ref={emojiIconRef}
                // setShowEmojis={setShowEmojis}
                flag={true}
              />
            </div>
          )}
          <input
            type="text"
            className="border-blue-500 border-0 border-b-2 h-7 focus:outline-none focus:border-gray-500 w-auto flex-grow text-sm"
            placeholder="Type here"
            style={{ maxWidth: "calc(100% - 1.75rem)", textIndent: "0.2rem" }}
            // value={inputValue}
            // onChange={handleInputChange}
            // ref={inputRef}
          />
          <div
            className="flex justify-center items-center h-7 w-8 border-0 border-b-2 border-blue-500"
            // onClick={() => setShowEmojis((prev) => !prev)}
            // ref={emojiIconRef}
          >
            <BsEmojiSmile className="text-blue-500 cursor-pointer text-[1.1rem]" />
          </div>
        </form>
        <div className="flex justify-around mb-2 mt-2">
          <button className="text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.1rem] px-2 rounded-sm">
            Add File
          </button>
          <button className="text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.1rem] px-2 rounded-sm">
            Add File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
