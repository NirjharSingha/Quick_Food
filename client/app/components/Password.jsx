"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { RiLockPasswordFill } from "react-icons/ri";

const Password = () => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const { setIsLoggedIn, setToastMessage } = useGlobals();
  const [newPass, setNewPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [warning, setWarning] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex font-sans text-gray-700 p-3 rounded-lg bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
          ref={buttonRef}
        >
          <RiLockPasswordFill className="text-2xl mr-2" />
          <p className="font-bold">Update Password</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription className="mb-2 mt-3">
            Enter your new password and confirm the new password.
          </DialogDescription>
        </DialogHeader>
        <p className="font-sans text-sm text-red-600 w-full text-center">
          {warning}
        </p>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            New Password:
          </Label>
          <div className="p-1 flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="password"
              name="password"
              type={showNewPass ? "text" : "password"}
              className="indent-2 rounded border-none outline-none cursor-pointer font-sans max-w-[86%]"
              placeholder="Enter password"
              value={newPass}
              required={true}
              onChange={(e) => {
                setWarning("");
                setNewPass(e.target.value);
              }}
            />
            {!showNewPass && (
              <AiFillEye
                className="w-8 h-5 cursor-pointer text-gray-700"
                onClick={() => setShowNewPass((prev) => !prev)}
              />
            )}
            {showNewPass && (
              <AiFillEyeInvisible
                className="w-8 h-5 cursor-pointer text-gray-700"
                onClick={() => setShowNewPass((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label
            htmlFor="accountId"
            className="text-left text-sm truncate col-span-1"
          >
            Confirm Password:
          </Label>
          <div className="p-1 flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="cpassword"
              name="cpassword"
              type={showConfirmPass ? "text" : "password"}
              className="indent-2 rounded border-none outline-none cursor-pointer font-sans max-w-[86%]"
              placeholder="Enter password"
              value={confirmPass}
              required={true}
              onChange={(e) => {
                setWarning("");
                setConfirmPass(e.target.value);
              }}
            />
            {!showConfirmPass && (
              <AiFillEye
                className="w-8 h-5 cursor-pointer text-gray-700"
                onClick={() => setShowConfirmPass((prev) => !prev)}
              />
            )}
            {showConfirmPass && (
              <AiFillEyeInvisible
                className="w-8 h-5 cursor-pointer text-gray-700"
                onClick={() => setShowConfirmPass((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              if (newPass === "" || confirmPass === "") {
                setWarning("Please fill all the fields");
                return;
              }
              if (newPass !== confirmPass) {
                setWarning("New password and confirm password do not match");
                return;
              }
              const data = {
                id: jwtDecode(localStorage.getItem("token")).sub,
                password: newPass,
              };
              try {
                const response = await axios.put(
                  `http://localhost:8080/user/updatePassword`,
                  data,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (response.status == 200) {
                  setToastMessage("Password updated successfully");
                  buttonRef && buttonRef.current && buttonRef.current.click();
                }
              } catch (error) {
                console.log("Error:", error.response);
                if (error.response.status === 401) {
                  handleUnauthorized(setIsLoggedIn, setToastMessage, router);
                }
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Password;
