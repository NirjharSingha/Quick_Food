"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

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
      className="p-7 bg-purple-300 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl mt-[2rem] max-w-[27rem] min-w-[27rem] overflow-y-auto mb-[0.1rem] scrollNone"
      style={{
        boxShadow: "-3px 5px 5px rgba(0, 0, 0, 0.3)",
        maxHeight: "calc(100svh - 4.1rem)",
      }}
    >
      <div className="flex justify-center items-center mb-3">
        <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
        <p className="font-serif text-2xl font-bold text-gray-700">Profile</p>
      </div>
      <div className="overflow-x-hidden">
        <div className="w-full flex justify-center items-center flex-col">
          <div className="w-[8.5rem] h-[8.5rem] bg-slate-200 mt-1 mb-3 rounded-full border-2 border-solid border-white"></div>
          {isEdit && (
            <div className="w-full flex justify-center items-center mb-2">
              <div
                onClick={() => fileInputRef.current.click()}
                className="file-input file-input-bordered file-input-xs w-full max-w-xs flex cursor-pointer"
              >
                <div className="w-[40%] h-full bg-slate-600 text-white flex justify-center items-center">
                  Choose image
                </div>
                <div className="w-[60%] h-full text-gray-700 flex justify-center items-center">
                  No image chosen
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-white border-2 border-solid border-gray-700 flex justify-center items-center ml-1 hover:text-white hover:bg-gray-700 cursor-pointer">
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
        <div className="flex items-center overflow-x-hidden">
          <p className="font-sans font-bold mb-2 mr-3">Email:</p>
          {isEdit ? (
            <input
              type="email"
              disabled
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-not-allowed bg-purple-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <p className="font-sans truncate mb-2">{"aaaaa"}</p>
          )}
        </div>
        <div className="flex items-center overflow-x-hidden">
          <p className="font-sans font-bold mb-2 mr-3">Username:</p>
          {isEdit ? (
            <input
              type="text"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-purple-300"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setProfilePic("");
              }}
            />
          ) : (
            <p className="font-sans truncate mb-2">{"aaaaa"}</p>
          )}
        </div>
        <div className="flex items-center overflow-x-hidden">
          <p className="font-sans font-bold mb-2 mr-3">Password:</p>
          {isEdit ? (
            <div className="p-1 flex items-center indent-2 rounded-2xl bg-purple-300 border-b-2 rounded-b-none mb-4">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans bg-purple-300"
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
        <div className="flex items-center overflow-x-hidden">
          <p className="font-sans font-bold mb-2 mr-3">Address:</p>
          {isEdit ? (
            <input
              type="text"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-purple-300"
              placeholder="Enter address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          ) : (
            <p className="font-sans truncate mb-2">{"aaaaa"}</p>
          )}
        </div>
        <div className="flex items-center overflow-x-hidden">
          <p className="font-sans font-bold mb-2 mr-3">Mobile:</p>
          {isEdit ? (
            <input
              type="number"
              className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-purple-300"
              placeholder="Enter mobile number"
              value={phoneNum}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
          ) : (
            <p className="font-sans truncate mb-2">{"aaaaa"}</p>
          )}
        </div>
        <div
          className="w-full h-8 bg-white font-sans font-bold mt-2 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer"
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
