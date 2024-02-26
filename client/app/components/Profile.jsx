"use client";

import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import axios from "axios";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("user2@gmail.com");
  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [imgStream, setImgStream] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const fileInputRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const divElement = divRef.current;

    const handleScroll = () => {
      if (divElement.scrollHeight > divElement.clientHeight) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    };

    divElement.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      divElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgStream(reader.result);
    };
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a new FormData object

    // Append the form data to the FormData object
    formData.append("name", username);
    formData.append("id", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("mobile", phoneNum);
    formData.append("file", profilePic);
    formData.append("userType", "customer");
    // const regDate = new Date().toISOString().replace("Z", "");
    // formData.append("regDate", regDate);

    try {
      const response = await axios.put(
        `http://localhost:8080/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJpYXQiOjE3MDg4NjI4NDksImV4cCI6MTcwODg2NjQ0OX0.31otpD6oOgg8NcSsGKZoyPngRuE_evgjJXatUpsxwFU`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // if (response.status == 201) {
      //   localStorage.setItem("token", response.data.token);
      //   navigate("/main");
      // }
    } catch (error) {
      console.log("Error:", error.response);
      // if (error.response) {
      //   const statusCode = error.response.status;
      //   const errorMessage = error.response.data.error;
      //   if (
      //     statusCode == 409 &&
      //     errorMessage === "Gmail address is already taken."
      //   ) {
      //     setWarning("Duplicate gmail address");
      //   }
      // } else if (error.request) {
      //   console.error("Error:", error.request);
      // } else {
      //   console.error("Error:", error.message);
      // }
    }
  };

  return (
    <form
      className="p-5 bg-slate-100 h-full overflow-y-auto"
      encType="multipart/form-data"
      onSubmit={handleRegSubmit}
      ref={divRef}
    >
      <div className="max-w-[40rem] mx-auto h-full relative">
        <div
          className="w-full bg-scroll bg-cover bg-center bg-no-repeat relative rounded-xl"
          style={{
            backgroundImage: `url(/profileBG.jpeg)`,
            width: "100%",
            height: "9rem",
          }}
        >
          <div className="flex justify-center items-center absolute top-2 left-1/2 transform -translate-x-1/2 mb-3">
            <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
            <p className="font-serif text-2xl font-bold text-gray-700">
              Profile
            </p>
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
              <div className="w-[65%] flex justify-center items-center mb-4 mt-3">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="file-input file-input-bordered file-input-xs w-full max-w-[15rem] flex cursor-pointer"
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
          className={`overflow-x-hidden ${isEdit ? "mt-[120px]" : "mt-[70px]"}`}
        >
          <div
            className={`flex overflow-x-hidden ${
              isEdit ? "items-center" : "flex-col"
            }`}
          >
            {!isEdit && (
              <>
                <p className="pl-1 font-sans font-bold mb-2 mr-3">Email:</p>
                <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
                  {"aaaaa"}
                </div>
              </>
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
            <div className="flex items-center overflow-x-hidden w-full">
              <p className="pl-1 font-sans font-bold mb-2 mr-3">Password:</p>
              {isEdit ? (
                <div className="p-1 flex items-center indent-2 rounded-2xl bg-slate-100 border-b-2 rounded-b-none mb-4 w-full">
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
            <p className="pl-1 font-sans font-bold mr-3">Mobile:</p>
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
              <div className="font-sans truncate border-2 border-gray-200 pl-2 rounded-md">
                {"aaaaa"}
              </div>
            )}
          </div>
          <div
            className={`w-full h-8 bg-gray-300 font-sans font-bold mt-5 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer ${
              isScrollable ? "mb-5" : "absolute bottom-0"
            }`}
            onClick={(e) => {
              if (!isEdit) {
                setIsEdit(true);
              } else {
                handleRegSubmit(e);
              }
            }}
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
      </div>
    </form>
  );
};

export default Profile;
