"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import Likes from "./Likes";
import EditOrDelete from "./EditOrDelete";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "../utils/unauthorized";

const ChatCard = ({
  chat,
  mySelf,
  myTarget,
  roomId,
  setChatToEdit,
  sendSocketNotification,
}) => {
  const router = useRouter();
  const { setToastMessage, setIsLoggedIn, setChats } = useGlobals();
  const [selectedLike, setSelectedLike] = useState(null);
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [showEditOrDelete, setShowEditOrDelete] = useState(false);
  const [flag, setFlag] = useState(true);
  const imageRef = useRef([]);
  const { windowWidth } = useGlobals();

  const toggleFullscreen = (index) => {
    const imageElement = imageRef.current[index];

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

  useEffect(() => {
    const userId = jwtDecode(window.localStorage.getItem("token")).sub;
    setFlag(chat.senderId === userId);
    console.log(chat.id);
  }, []);

  useEffect(() => {
    setSelectedLike(chat.reaction);
  }, [chat.reaction]);

  const deleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/deleteChatById?chatId=${chat.id}&roomId=${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowEditOrDelete(false);
        setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id));
        setToastMessage("Chat deleted successfully");
        sendSocketNotification("delete", { id: chat.id });
      }
    } catch (error) {
      console.error(error);
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

  const likeHandler = async (like) => {
    console.log("inside like handler");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/reaction?chatId=${chat.id}&roomId=${roomId}&reaction=${like}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedLike((prev) => {
          if (prev !== like) {
            const chatToSend = {
              id: chat.id,
              reaction: like,
            };
            sendSocketNotification("reaction", chatToSend);
          }
          if (prev === like) return null;
          else return like;
        });
        setShouldDisplayAllLikes(false);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        // handleUnauthorized(setIsLoggedIn, setToastMessage, router);
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

  const editHandler = async () => {
    setShowEditOrDelete(false);
    setChatToEdit(chat);
  };

  return (
    <div
      className={`chat ${flag ? "chat-end" : "chat-start"}`}
      style={windowWidth > 370 ? {} : { gridAutoColumns: "1fr", gap: "0" }}
    >
      {windowWidth > 370 && (
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full border-[1.5px] border-solid border-gray-700">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                flag
                  ? mySelf.image !== null
                    ? `data:image/jpg;base64,${mySelf.image}`
                    : "/user.svg"
                  : myTarget.image !== null
                  ? `data:image/jpg;base64,${myTarget.image}`
                  : "/user.svg"
              }
            />
          </div>
        </div>
      )}
      <div
        className={`relative flex ${
          flag ? "flex-row-reverse" : ""
        } min-w-[13rem] max-w-[30rem] items-center p-0 ${
          windowWidth <= 370 ? (flag ? "mr-2" : "ml-2") : ""
        } `}
      >
        <div style={{ maxWidth: "calc(100% - 2rem)" }}>
          <div className="chat-header">
            <p
              className={`text-[0.8rem] ${
                flag ? "mr-3 text-right" : "ml-3"
              } opacity-50`}
            >
              {chat.isEdited ? "Edited" : ""}
            </p>
          </div>
          <div
            className={`chat-bubble flex gap-2 flex-col items-center relative ${
              selectedLike === null ? "" : "pb-6"
            } ${flag ? "bg-blue-700" : ""}`}
            style={{ minWidth: "100%" }}
          >
            {chat &&
              chat.files &&
              chat.files.map((file, index) => (
                <div key={index}>
                  {file.fileType.startsWith("image/") && (
                    <img
                      src={`data:${file.fileType};base64,${file.data}`}
                      alt="file"
                      ref={(el) => (imageRef.current[index] = el)}
                      onClick={() => toggleFullscreen(index)}
                      className={`cursor-pointer rounded-md ${
                        windowWidth < 320
                          ? "w-[200px] h-[160px]"
                          : "w-[240px] h-[190px]"
                      }`}
                    />
                  )}
                  {file.fileType.startsWith("video/") && (
                    <video
                      src={`data:${file.fileType};base64,${file.data}`}
                      controls
                      className={`cursor-pointer rounded-md ${
                        windowWidth < 320 ? "w-[200px]" : "w-[240px]"
                      }`}
                    />
                  )}
                  {!file.fileType.startsWith("image/") &&
                    !file.fileType.startsWith("video/") && (
                      <span className="w-full h-full flex items-center justify-center">
                        Unsupported File Type
                      </span>
                    )}
                </div>
              ))}
            <p className="w-full min-w-[150px]">{chat.message}</p>
            {flag === true && chat.isSeen && (
              <IoCheckmarkDoneOutline className="text-lg cursor-pointer ml-auto" />
            )}
            {selectedLike !== null && (
              <div
                className="w-[1.7rem] h-[1.7rem] flex justify-center items-center absolute bottom-0 bg-slate-300 rounded-full"
                style={flag === true ? { left: "0" } : { right: "0" }}
              >
                {selectedLike === "LIKE" ? (
                  <AiFillLike className="text-[1.2rem] text-blue-600" />
                ) : selectedLike === "DISLIKE" ? (
                  <AiFillDislike className="text-[1.2rem] text-blue-600" />
                ) : selectedLike === "LAUGH" ? (
                  <FaLaughSquint className="text-[1.2rem] text-yellow-500" />
                ) : selectedLike === "ANGRY" ? (
                  <FaAngry className="text-[1.2rem] text-red-400" />
                ) : selectedLike === "SAD" ? (
                  <FaSadCry className="text-[1.2rem] text-yellow-500" />
                ) : selectedLike === "LOVE" ? (
                  <FcLike className="text-[1.2rem]" />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <div
            className={`text-[0.8rem] chat-footer opacity-50 ${
              flag ? "text-right" : ""
            }`}
          >
            {new Date(chat.timestamp).toLocaleTimeString()}
          </div>
        </div>
        {!flag && (
          <BsEmojiSmile
            className={`text-xl cursor-pointer ml-2 ${
              !chat.isEdited ? "mb-6" : ""
            }`}
            onClick={() => setShouldDisplayAllLikes(true)}
          />
        )}
        {shouldDisplayAllLikes && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Likes
              selected={selectedLike}
              setShouldDisplayAllLikes={setShouldDisplayAllLikes}
              flag={!chat.isEdited}
              likeHandler={likeHandler}
            />
          </div>
        )}
        {flag && (
          <BsThreeDots
            className={`text-xl cursor-pointer mr-2 ${
              !chat.isEdited ? "mb-6" : ""
            }`}
            onClick={() => setShowEditOrDelete(true)}
          />
        )}
        {showEditOrDelete && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <EditOrDelete
              setShowEditOrDelete={setShowEditOrDelete}
              flag={!chat.isEdited}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
