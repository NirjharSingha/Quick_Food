"use client";

import React, { useState } from "react";
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

const ChatCard = () => {
  const [selectedLike, setSelectedLike] = useState(null);
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [showEditOrDelete, setShowEditOrDelete] = useState(false);
  const flag = false;
  const imageRef = useRef([]);
  const messageAttachments = [
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  ];
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

  return (
    <div
      className={`chat ${flag ? "chat-end" : "chat-start"}`}
      style={windowWidth > 370 ? {} : { gridAutoColumns: "1fr", gap: "0" }}
    >
      {windowWidth > 370 && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
              className={`text-sm ${
                flag ? "mr-3 text-right" : "ml-3"
              } opacity-50`}
            >
              Edited
            </p>
          </div>
          <div
            className={`chat-bubble flex gap-2 flex-col items-center relative ${
              selectedLike === null ? "" : "pb-6"
            } ${flag ? "bg-blue-700" : ""}`}
            style={{ minWidth: "100%" }}
          >
            <p className="w-full">Lorem</p>
            {messageAttachments.map((attachment, index) => (
              <div key={index}>
                {attachment.endsWith(".jpg") ||
                attachment.endsWith(".png") ||
                attachment.endsWith(".jpeg") ? (
                  <img
                    key={index}
                    src={attachment}
                    alt=""
                    ref={(el) => (imageRef.current[index] = el)}
                    onClick={() => toggleFullscreen(index)}
                    className={`cursor-pointer ${
                      windowWidth < 320
                        ? "w-[200px] h-[160px]"
                        : "w-[240px] h-[190px]"
                    }`}
                  />
                ) : attachment.endsWith(".mp4") ? (
                  <video
                    controls
                    className={`cursor-pointer ${
                      windowWidth < 320 ? "w-[200px]" : "w-[240px]"
                    }`}
                  >
                    <source src={attachment} controls />
                  </video>
                ) : (
                  <p key={index}></p>
                )}
              </div>
            ))}
            {flag === true && (
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
          <div className={`chat-footer opacity-50 ${flag ? "text-right" : ""}`}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        {!flag && (
          <BsEmojiSmile
            className="text-xl cursor-pointer ml-2"
            onClick={() => setShouldDisplayAllLikes(true)}
          />
        )}
        {shouldDisplayAllLikes && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Likes
              selected={selectedLike}
              setSelected={setSelectedLike}
              setShouldDisplayAllLikes={setShouldDisplayAllLikes}
            />
          </div>
        )}
        {flag && (
          <BsThreeDots
            className="text-xl cursor-pointer mr-2"
            onClick={() => setShowEditOrDelete(true)}
          />
        )}
        {showEditOrDelete && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <EditOrDelete setShowEditOrDelete={setShowEditOrDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;