import React from "react";
import ChatCard from "@/app/components/ChatCard";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";

const page = () => {
  return (
    <div className="pt-0 pb-4 pl-1 pr-1 md:pl-3 md:pr-3 w-full max-w-[50rem] mx-auto shadow-lg shadow-gray-400 h-[100%]  overflow-y-auto">
      <div className=""></div>
      <ChatCard />
      <form
        className="flex items-center w-full gap-2"
        encType="multipart/form-data"
        // style={{ width: "calc(100% - 1.5rem)" }}
      >
        <div className="flex w-full">
          {/* {showEmojis && (
            <div className="commentMainEmoji bottom-[1.9rem]" ref={emojiRef}>
              <EmojiList setInputValue={setInputValue} inputRef={inputRef} />
            </div>
          )} */}
          <div
            className="flex justify-center items-center h-8 w-9 border-2 border-r-0 border-gray-500 rounded-tl-full rounded-bl-full"
            // onClick={() => setShowEmojis((prev) => !prev)}
            // ref={Ref}
          >
            <BsEmojiSmile className="text-gray-400 text-[1.2rem]" />
          </div>
          <input
            type="text"
            className="border-2 border-gray-500 border-l-0 border-r-0 h-8 focus:outline-none focus:border-gray-500 w-auto flex-grow"
            placeholder="Type here"
            style={{ maxWidth: "calc(100vw - 7rem)" }}
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
