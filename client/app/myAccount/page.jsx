"use client";

import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useGlobals } from "../contexts/Globals";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const Page = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [imgStream, setImgStream] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [warning, setWarning] = useState("");
  const fileInputRef = useRef(null);
  const divRef = useRef(null);
  const { setToastMessage, setProfilePercentage, setIsLoggedIn } = useGlobals();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        setShowLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getUser?userId=${
            token !== null ? jwtDecode(token).sub : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setShowLoading(false);
          setUsername(response.data.name);
          setPhoneNum(
            response.data.mobile !== null ? response.data.mobile : ""
          );
          setAddress(
            response.data.address !== null ? response.data.address : ""
          );
          setId(response.data.id);
          if (response.data.profilePic !== null) {
            setImgStream(`data:image/jpeg;base64,${response.data.profilePic}`);
            console.log(typeof response.data.profilePic);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };

    getProfile();
  }, []);

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
    setWarning("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgStream(reader.result);
    };
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (username === "") {
      setWarning("Username cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("id", jwtDecode(localStorage.getItem("token")).sub);
    formData.append("name", username);
    formData.append("address", address);
    formData.append("mobile", phoneNum);
    formData.append("file", profilePic);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        setToastMessage("Profile updated successfully");
        setIsEdit(false);

        let percentage = 40;
        if (address !== "") {
          percentage += 20;
        }
        if (phoneNum !== "") {
          percentage += 20;
        }
        if (imgStream !== "") {
          percentage += 20;
        }

        setProfilePercentage(percentage);
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  return (
    <form
      className="p-5 bg-slate-100 h-full overflow-y-auto w-full"
      encType="multipart/form-data"
      onSubmit={handleUpdateProfile}
      ref={divRef}
    >
      {showLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!showLoading && (
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
                <div className="w-[65%] min-w-[220px] flex justify-center items-center mb-4 mt-3">
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="file-input file-input-bordered file-input-xs w-full max-w-[15rem] flex cursor-pointer"
                  >
                    <div className="w-[44%] h-full bg-slate-600 text-white flex justify-center items-center">
                      Choose image
                    </div>
                    <div className="w-[56%] h-full text-gray-700 flex justify-center items-center">
                      {imgStream === "" ? "No image chosen" : "Image chosen"}
                    </div>
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
          </div>
          <div
            className={`overflow-x-hidden ${
              isEdit ? "mt-[120px]" : "mt-[70px]"
            }`}
          >
            {isEdit && (
              <p className="font-sans text-sm text-red-600 w-full text-center mt-2 mb-2">
                {warning}
              </p>
            )}
            <div
              className={`flex overflow-x-hidden ${
                isEdit ? "items-center" : "flex-col"
              }`}
            >
              {!isEdit && (
                <>
                  <p className="pl-1 font-sans font-bold mb-2 mr-3">ID:</p>
                  <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
                    {id}
                  </div>
                </>
              )}
            </div>
            <div
              className={`flex overflow-x-hidden ${
                isEdit ? "items-center" : "flex-col"
              }`}
            >
              <p className="pl-1 font-sans font-bold mb-2 mr-3">
                Username:{isEdit && <span className="text-red-500">*</span>}
              </p>
              {isEdit ? (
                <input
                  type="text"
                  className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-slate-100"
                  placeholder="Enter username"
                  required={true}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setWarning("");
                  }}
                />
              ) : (
                <div className="font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md">
                  {username}
                </div>
              )}
            </div>
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
                    setWarning("");
                  }}
                />
              ) : (
                <div
                  className={`font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md ${
                    address === "" ? "text-gray-500" : ""
                  }`}
                >
                  {address !== "" ? address : "not filled"}
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
                    setWarning("");
                  }}
                />
              ) : (
                <div
                  className={`font-sans truncate mb-2 border-2 border-gray-200 pl-2 rounded-md ${
                    phoneNum === "" ? "text-gray-500" : ""
                  }`}
                >
                  {phoneNum !== "" ? phoneNum : "not filled"}
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
                  handleUpdateProfile(e);
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
      )}
    </form>
  );
};

export default Page;
