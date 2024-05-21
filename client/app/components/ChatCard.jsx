"use client";

import React from "react";
import { useRef } from "react";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

const ChatCard = () => {
  const flag = true;
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
        className={`flex ${
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
            className={`chat-bubble flex gap-2 flex-col items-center ${
              flag ? "bg-blue-700" : ""
            }`}
            style={{ minWidth: "100%" }}
          >
            <p className="w-full">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              omnis tenetur, necessitatibus delectus eveniet voluptatum unde,
              nihil sapiente illum minima et eligendi deleniti, ipsum blanditiis
              natus itaque! Aut, totam tenetur!
            </p>
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
          </div>
          <div className={`chat-footer opacity-50 ${flag ? "text-right" : ""}`}>
            {"aaaaaaaaaaaaaaaaaaa"}
          </div>
        </div>
        {!flag && <BsEmojiSmile className="text-xl cursor-pointer ml-2" />}
        {flag && <BsThreeDots className="text-xl cursor-pointer mr-2" />}
      </div>
    </div>
  );
};

export default ChatCard;
