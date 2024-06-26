"use client";

import React, { useState, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Emoji from "./Emoji";

const ChatDialog = ({
  parentInput,
  setParentInput,
  setIAmTyping,
  lastTypingTimeRef,
  chatAttachments,
  setChatAttachments,
  previewFiles,
  setPreviewFiles,
  inputValue,
  setInputValue,
  chatToEdit,
  setChatToEdit,
  handleSubmit,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const inputRef = useRef(null);
  const emojiIconRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef([]);
  const imageRef2 = useRef([]);
  const [prevAttachments, setPrevAttachments] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIAmTyping(true);
    lastTypingTimeRef.current = new Date().getTime();
  };

  useEffect(() => {
    if (chatToEdit === null) {
      setInputValue(parentInput);
    } else {
      setInputValue(chatToEdit.message);
    }

    setParentInput("");
  }, []);

  useEffect(() => {
    if (chatToEdit !== null) {
      setPrevAttachments(chatToEdit.files);
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

  const toggleFullscreen = (imageElement) => {
    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleCancel = () => {
    setPreviewFiles([]);
    setChatToEdit(null);
    setChatAttachments([]);
  };

  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100svh] bg-slate-200 bg-opacity-70 z-10 flex justify-center items-center">
      <div
        encType="multipart/form-data"
        className="w-full max-w-[400px] rounded bg-white shadow-md shadow-gray-500 max-h-[100svh]"
      >
        <div className="w-full h-[2.3rem] bg-slate-500 flex items-center justify-end rounded-t">
          <div
            className="font-bold text-sm text-white h-[1.8rem] w-[1.8rem] mr-2 hover:bg-red-600 hover:rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleCancel}
          >
            X
          </div>
        </div>
        <div className="w-full pl-1 pr-1 mt-1 mb-1">
          <div className="w-full flex overflow-x-auto gap-2 rounded min-h-[1.5rem]">
            {prevAttachments.map((file, index) => (
              <div
                className="min-w-[7.8rem] max-w-[7.8rem] h-[6.8rem] flex justify-center items-center bg-slate-300 relative rounded"
                key={file.id}
              >
                <div
                  className="z-10 absolute top-0 right-0 w-[1.6rem] h-[1.6rem] bg-gray-500 hover:bg-gray-600 rounded-full text-white flex justify-center items-center cursor-pointer text-sm"
                  onClick={() => {
                    setPrevAttachments((prevFiles) =>
                      prevFiles.filter((f) => f.id !== file.id)
                    );
                  }}
                >
                  x
                </div>
                {file.fileType.startsWith("image/") && (
                  <img
                    src={`data:${file.fileType};base64,${file.data}`}
                    alt="file"
                    ref={(el) => (imageRef2.current[index] = el)}
                    onClick={() => toggleFullscreen(imageRef2.current[index])}
                    className="w-full h-full min-h-full object-fill rounded"
                  />
                )}
                {file.fileType.startsWith("video/") && (
                  <video
                    src={`data:${file.fileType};base64,${file.data}`}
                    controls
                    className="w-full h-full object-fill rounded"
                  />
                )}
                {!file.fileType.startsWith("image/") &&
                  !file.fileType.startsWith("video/") && (
                    <span className="w-full h-full object-fill rounded">
                      Unsupported File Type
                    </span>
                  )}
              </div>
            ))}
            {chatAttachments.map((file, index) => (
              <div
                className="min-w-[7.8rem] max-w-[7.8rem] h-[6.8rem] flex justify-center items-center bg-slate-300 relative rounded"
                key={index}
              >
                <div
                  className="z-10 absolute top-0 right-0 w-[1.6rem] h-[1.6rem] bg-gray-500 hover:bg-gray-600 rounded-full text-white flex justify-center items-center cursor-pointer text-sm"
                  onClick={() => {
                    setChatAttachments((prevFiles) =>
                      prevFiles.filter((_, i) => i !== index)
                    );
                    setPreviewFiles((prevFiles) =>
                      prevFiles.filter((_, i) => i !== index)
                    );
                  }}
                >
                  x
                </div>
                <div key={index}>
                  {file.type.startsWith("image/") ? (
                    <img
                      src={previewFiles[index]}
                      alt={file.name}
                      ref={(element) => (imageRef.current[index] = element)}
                      onClick={() => toggleFullscreen(imageRef.current[index])}
                      className="w-full h-full min-h-full object-fill rounded"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={previewFiles[index]}
                      controls
                      className="w-full h-full object-fill rounded"
                    />
                  ) : (
                    <span>Unsupported File Type</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mr-2 mb-1 mt-2">
          <input
            type="file"
            name="chatAttachments"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*, video/*"
          />
          <button
            className="ml-auto text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.2rem] px-2 rounded-sm"
            onClick={() => {
              fileInputRef.current.click();
            }}
            type="button"
          >
            Add File
          </button>
        </div>
        <div className="flex items-center w-full mb-1 p-1 relative">
          {showEmojis && (
            <div className="absolute bottom-full right-3">
              <Emoji
                setInputValue={setInputValue}
                inputRef={inputRef}
                Ref={emojiIconRef}
                setShowEmojis={setShowEmojis}
                flag={true}
              />
            </div>
          )}
          <input
            type="text"
            className="border-blue-500 border-0 border-b-2 h-7 focus:outline-none focus:border-gray-500 w-auto flex-grow text-sm"
            placeholder="Type here"
            style={{ maxWidth: "calc(100% - 1.75rem)", textIndent: "0.2rem" }}
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <div
            className="flex justify-center items-center h-7 w-8 border-0 border-b-2 border-blue-500"
            onClick={() => setShowEmojis((prev) => !prev)}
            ref={emojiIconRef}
          >
            <BsEmojiSmile className="text-blue-500 cursor-pointer text-[1.1rem]" />
          </div>
        </div>
        <div className="flex justify-around mb-2 mt-2">
          <button
            className="text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.2rem] px-2 rounded-sm"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="text-[0.8rem] text-blue-500 font-bold hover:bg-gray-300 p-[0.2rem] px-2 rounded-sm"
            onClick={() => handleSubmit(inputValue, prevAttachments)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
