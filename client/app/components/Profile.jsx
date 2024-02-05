"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import Image from "next/image";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [profilePic, setProfilePic] = useState({});
  const [imgStream, setImgStream] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgStream(reader.result);
    };
  };

  return (
    <form
      className="p-5 bg-slate-100 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl mt-[2rem] max-w-[27rem] min-w-[27rem] overflow-y-auto mb-[0.1rem] scrollNone"
      style={{
        boxShadow: "-3px 5px 5px rgba(0, 0, 0, 0.3)",
        maxHeight: "calc(100svh - 4.1rem)",
      }}
    >
      <div
        className="w-full bg-scroll bg-cover bg-center bg-no-repeat relative rounded-xl"
        style={{
          backgroundImage: `url(/profileBG.jpeg)`,
          width: "100%",
          height: "9rem",
        }}
      >
        <button className="btn btn-circle btn-outline absolute right-1 top-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex justify-center items-center absolute top-2 left-1/2 transform -translate-x-1/2 mb-3">
          <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
          <p className="font-serif text-2xl font-bold text-gray-700">Profile</p>
        </div>
        <div className="w-full flex absolute top-[68px] justify-center items-center flex-col mb-2">
          {imgStream === "" ? (
            <div className="w-[8.5rem] h-[8.5rem] bg-slate-200 mt-1 mb-2 rounded-full border-2 border-solid border-white" />
          ) : (
            <Image
              src={imgStream}
              alt="profile picture"
              width={136}
              height={136}
              className="bg-slate-200 min-w-[8.5rem] min-h-[8.5rem] max-w-[8.5rem] max-h-[8.5rem] mt-1 mb-3 rounded-full border-2 border-solid border-white object-cover"
            />
          )}
          {isEdit && (
            <div className="w-[65%] flex justify-center items-center mb-2">
              <div
                onClick={() => fileInputRef.current.click()}
                className="file-input file-input-bordered file-input-xs w-full max-w-xs flex cursor-pointer"
              >
                <div className="w-[40%] h-full bg-slate-600 text-white flex justify-center items-center">
                  Choose image
                </div>
                <div className="w-[60%] h-full text-gray-700 flex justify-center items-center">
                  {imgStream === "" ? "No image chosen" : "Image chosen"}
                </div>
              </div>
              {imgStream !== "" && (
                <div
                  className="w-5 h-5 rounded-full bg-white border-2 border-solid border-gray-700 flex justify-center items-center ml-1 hover:text-white hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setImgStream("");
                    setProfilePic({});
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
          )}
          <input
            className="hidden"
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div
        className={`overflow-x-hidden ${isEdit ? "mt-[100px]" : "mt-[70px]"}`}
      >
        <div
          className={`flex overflow-x-hidden ${
            isEdit ? "items-center" : "flex-col"
          }`}
        >
          <p className="pl-1 font-sans font-bold mb-2 mr-3">Email:</p>
          {isEdit ? (
            <input
              type="email"
              disabled
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-not-allowed bg-slate-100"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
              {"aaaaa"}
            </div>
          )}
        </div>
        <div
          className={`flex overflow-x-hidden ${
            isEdit ? "items-center" : "flex-col"
          }`}
        >
          <p className="pl-1 font-sans font-bold mb-2 mr-3">Username:</p>
          {isEdit ? (
            <input
              type="text"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-slate-100"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          ) : (
            <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
              {"aaaaa"}
            </div>
          )}
        </div>
        {isEdit && (
          <div className="flex items-center overflow-x-hidden">
            <p className="pl-1 font-sans font-bold mb-2 mr-3">Password:</p>
            {isEdit ? (
              <div className="p-1 flex items-center indent-2 rounded-2xl bg-slate-100 border-b-2 rounded-b-none mb-4">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans bg-slate-100"
                  placeholder="Enter updated password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {!showPass && (
                  <AiFillEye
                    className="w-8 h-5 cursor-pointer text-gray-700"
                    onClick={() => setShowPass((prev) => !prev)}
                  />
                )}
                {showPass && (
                  <AiFillEyeInvisible
                    className="w-8 h-5 cursor-pointer text-gray-700"
                    onClick={() => setShowPass((prev) => !prev)}
                  />
                )}
              </div>
            ) : (
              <p className="font-sans truncate mb-2">. . . . . . . .</p>
            )}
          </div>
        )}
        <div
          className={`flex overflow-x-hidden ${
            isEdit ? "items-center" : "flex-col"
          }`}
        >
          <p className="pl-1 font-sans font-bold mb-2 mr-3">Address:</p>
          {isEdit ? (
            <input
              type="text"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-slate-100 mr-1"
              placeholder="Enter address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          ) : (
            <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
              {"aaaaa"}
            </div>
          )}
        </div>
        <div
          className={`flex overflow-x-hidden ${
            isEdit ? "items-center" : "flex-col"
          }`}
        >
          <p className="pl-1 font-sans font-bold mb-2 mr-3">Mobile:</p>
          {isEdit ? (
            <input
              type="number"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-slate-100"
              placeholder="Enter mobile number"
              value={phoneNum}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
          ) : (
            <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
              {"aaaaa"}
            </div>
          )}
        </div>
        <div
          className="w-full h-8 bg-gray-300 font-sans font-bold mt-2 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer"
          onClick={() => setIsEdit((prev) => !prev)}
        >
          {!isEdit ? (
            <>
              <MdEdit className="mr-1 text-lg" />
              Edit
            </>
          ) : (
            "Apply"
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;
