"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "../utils/unauthorized";

const Complaint = ({ buttonRef, orderId, setOrderCards }) => {
  const [warning, setWarning] = useState("");
  const [input, setInput] = useState("");
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const router = useRouter();

  const handler = async (complaint) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/order/complaint?orderId=${orderId}&complain=${complaint}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        if (complaint !== "") {
          setToastMessage("Complaint Submitted Successfully");
        } else {
          setToastMessage("You Didn't Complaint for the Order");
        }
        setOrderCards((prev) => {
          const filteredOrderCards = prev.filter((card) => card.id !== orderId);
          return filteredOrderCards;
        });
        buttonRef.current.click();
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="hidden"
          ref={buttonRef}
          onClick={() => {
            setInput("");
          }}
        >
          Complaint
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription className="mb-2 mt-3">
            Your order is successfully delivered to you. Do you have any
            complaint regarding our services?
          </DialogDescription>
        </DialogHeader>
        <p className="font-sans text-sm text-red-600 w-full text-center">
          {warning}
        </p>
        <input
          type="text"
          className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-6 outline-none p-1 font-sans cursor-pointer"
          placeholder="Type your complaint here"
          value={input}
          onChange={(e) => {
            setWarning("");
            setInput(e.target.value);
          }}
        />
        <DialogFooter>
          <div className="w-full p-2 flex items-center"></div>
          <Button
            className="w-[9rem] font-bold bg-white text-gray-700 hover:text-black hover:bg-slate-200 shadow"
            onClick={async () => handler("")}
          >
            No Complaint
          </Button>
          <Button
            className="w-[9rem] font-bold"
            onClick={async () => {
              if (input === "") {
                setWarning("Fill your complaint in the input field!");
                return;
              }
              handler(input);
            }}
          >
            Submit Complaint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Complaint;
