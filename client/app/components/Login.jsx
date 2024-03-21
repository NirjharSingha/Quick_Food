"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import { jwtDecode } from "jwt-decode";

// npm install @react-oauth/google
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setShowLogin, setShowSignUp, isUserLogin }) => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("");
  const [id, setId] = useState("");
  const containerRef = useRef(null);
  const { setIsLoggedIn, setToastMessage } = useGlobals();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id.includes("@") && !isUserLogin) {
      setWarning("Invalid id");
      return;
    }

    const postData = {
      id: id,
      password: password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        setShowLogin(false);
        setToastMessage("Logged in successfully");
      }
    } catch (error) {
      console.log(error);
      setWarning("Invalid credentials");
    }
  };

  const handleGoogleAuth = async (details) => {
    const postData = {
      id: details.email,
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
        setShowLogin(false);
        setToastMessage("Logged in successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="p-7 bg-white z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl mt-[2rem] min-w-[25rem]"
      style={{ boxShadow: "-3px 5px 5px rgba(0, 0, 0, 0.3)" }}
      ref={containerRef}
      onSubmit={handleLogin}
    >
      <button
        type="button"
        className="absolute right-2 top-2 h-[2.3rem] w-[2.3rem] rounded-full bg-gray-400 flex justify-center items-center hover:bg-red-500 text-gray-700 font-bold text-sm hover:text-white"
        onClick={() => setShowLogin(false)}
      >
        X
      </button>
      <div className="flex justify-center items-center mb-6 mt-2">
        <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
        <p className="font-serif text-2xl font-bold text-gray-700">Log in</p>
      </div>
      <input
        type={isUserLogin ? "email" : "text"}
        className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-6 outline-none p-1 font-sans cursor-pointer"
        placeholder={isUserLogin ? "Enter email" : "Enter employee id"}
        value={id}
        required={true}
        onChange={(e) => {
          setWarning("");
          setId(e.target.value);
        }}
      />
      <div className="p-1 flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none mb-6">
        <input
          id="password"
          name="password"
          type={showPass ? "text" : "password"}
          className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans"
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
      <p className="font-sans text-sm text-red-600 w-full text-center mt-4">
        {warning}
      </p>
      <button
        type="submit"
        className="w-full h-8 bg-gray-300 font-sans font-bold mt-2 rounded-2xl hover:bg-gray-500 mb-2"
      >
        Log in
      </button>
      {isUserLogin && (
        <div className="font-sans text-sm w-full text-center mt-3 text-gray-700">
          Don't have an account?
          <span
            className="font-bold ml-1 hover:underline cursor-pointer text-gray-700"
            onClick={() => {
              setShowLogin(false);
              setShowSignUp(true);
            }}
          >
            Register
          </span>
        </div>
      )}
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

export default Login;
