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
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";

const MenuDialog = ({ isAdd, menu }) => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const { setIsLoggedIn, setToastMessage } = useGlobals();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [warning, setWarning] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isAdd ? (
          <div
            className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
            ref={buttonRef}
          >
            <IoMdAddCircle className="text-2xl mr-2" />
            <p className="font-bold truncate">Add New Menu</p>
          </div>
        ) : (
          <div
            className="mt-1 font-bold text-blue-500 hover:bg-gray-300 p-1 rounded-full text-lg ml-3 mb-2 hover:p-2 hover:text-sm cursor-pointer"
            ref={buttonRef}
          >
            <GrEdit />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Menu Item</DialogTitle>
          <DialogDescription className="mb-2 mt-3">
            The * fields must be filled.
          </DialogDescription>
        </DialogHeader>
        <p className="font-sans text-sm text-red-600 w-full text-center">
          {warning}
        </p>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Name : <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="name"
              type="text"
              name="name"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Enter name"
              value={name}
              required={true}
              onChange={(e) => {
                setWarning("");
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Category : <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <select
              className="select select-ghost w-full"
              value={category}
              onChange={(e) => {
                setWarning("");
                console.log(e.target.value);
                setCategory(e.target.value);
              }}
            >
              <option disabled value="">
                Select category
              </option>
              <option value="VEG">Veg</option>
              <option value="NON-VEG">Non-Veg</option>
              <option value="VEGAN">Vegan</option>
              <option value="drink">Drink</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Price : <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="price"
              type="number"
              name="price"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Enter price"
              value={price}
              required={true}
              onChange={(e) => {
                setWarning("");
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Quantity :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="quantity"
              type="number"
              name="quantity"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Enter quantity"
              value={quantity}
              required={true}
              onChange={(e) => {
                setWarning("");
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Image :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              type="file"
              name="file"
              id="file"
              className="file-input file-input-bordered h-[2rem] w-full max-w-xs"
              accept="image/*"
              onChange={(e) => {
                setWarning("");
                const file = e.target.files[0];
                setImage(file);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-[6rem] font-bold"
            onClick={async () => {
              if (name === "" || category === "" || price === "") {
                setWarning("Please fill the required fields");
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
