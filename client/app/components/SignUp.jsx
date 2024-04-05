"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import { jwtDecode } from "jwt-decode";

const SignUp = ({ setShowLogin, setShowSignUp }) => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const containerRef = useRef(null);
  const { setIsLoggedIn, setToastMessage, setRole } = useGlobals();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSignUp(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setWarning("Passwords do not match");
      return;
    }

    const postData = {
      id: id,
      name: username,
      password: password,
      role: "CUSTOMER",
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        setRole(response.data.role);
        localStorage.setItem("role", response.data.role);
        setShowSignUp(false);
        setToastMessage("Signed up successfully");
      }
    } catch (error) {
      console.log(error);
      setWarning("Invalid input");
    }
  };

  const handleGoogleAuth = async (details) => {
    const postData = {
      id: details.id,
      name: details.given_name,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/googleAuth`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        setRole(response.data.role);
        localStorage.setItem("role", response.data.role);
        setShowSignUp(false);
        setToastMessage("Signed up successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="p-7 bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl mt-[2rem]"
      style={{ boxShadow: "-3px 5px 5px rgba(0, 0, 0, 0.3)" }}
      ref={containerRef}
      onSubmit={handleSignUp}
    >
      <button
        type="button"
        className="absolute right-2 top-2 h-[2.3rem] w-[2.3rem] rounded-full bg-gray-400 flex justify-center items-center hover:bg-red-500 text-gray-700 font-bold text-sm hover:text-white"
        onClick={() => setShowSignUp(false)}
      >
        X
      </button>
      <div className="flex justify-center items-center mb-3 mt-2">
        <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
        <p className="font-serif text-2xl font-bold text-gray-700">Sign up</p>
      </div>
      <input
        type="email"
        className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-white"
        placeholder="Enter email"
        required={true}
        value={id}
        onChange={(e) => {
          setWarning("");
          setId(e.target.value);
        }}
      />
      <input
        type="text"
        className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-white"
        placeholder="Enter username"
        value={username}
        required={true}
        onChange={(e) => {
          setWarning("");
          setUsername(e.target.value);
        }}
      />
      <div className="p-1 flex items-center indent-2 rounded-2xl bg-white border-b-2 rounded-b-none mb-4">
        <input
          id="password"
          name="password"
          type={showPass ? "text" : "password"}
          className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans bg-white"
          placeholder="Enter password"
          value={password}
          required={true}
          onChange={(e) => {
            setWarning("");
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
      <div className="p-1 flex items-center indent-2 rounded-2xl bg-white border-b-2 rounded-b-none">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans bg-white"
          placeholder="Confirm password"
          value={confirmPassword}
          required={true}
          onChange={(e) => {
            setWarning("");
            setConfirmPassword(e.target.value);
          }}
        />
        {!showConfirmPassword && (
          <AiFillEye
            className="w-8 h-5 cursor-pointer text-gray-700"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        )}
        {showConfirmPassword && (
          <AiFillEyeInvisible
            className="w-8 h-5 cursor-pointer text-gray-700"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        )}
      </div>
      <p className="font-sans text-sm text-red-600 w-full text-center mt-2">
        {warning}
      </p>
      <button
        type="submit"
        className="w-full h-8 bg-gray-300 font-sans font-bold mt-2 rounded-2xl hover:bg-gray-500"
      >
        Sign up
      </button>
      <div className="font-sans text-sm w-full text-center mt-3 text-gray-700">
        Already have an account?
        <span
          className="font-bold ml-1 hover:underline cursor-pointer text-gray-700"
          onClick={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
        >
          Log in
        </span>
      </div>
      <div className="mt-4 w-full flex justify-center items-center">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const details = jwtDecode(credentialResponse.credential);
              handleGoogleAuth(details);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </form>
  );
};

export default SignUp;
