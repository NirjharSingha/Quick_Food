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
import { GrEdit } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";

const MenuDialog = ({ isAdd, menu }) => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const { setIsLoggedIn, setToastMessage, setMenu } = useGlobals();
  const [name, setName] = useState(isAdd ? "" : menu.name);
  const [category, setCategory] = useState(isAdd ? "" : menu.category);
  const [warning, setWarning] = useState("");
  const [price, setPrice] = useState(isAdd ? "" : menu.price);
  const [quantity, setQuantity] = useState(isAdd ? 0 : menu.quantity);
  const [image, setImage] = useState(null);

  const isValidQuantity = (quantity) => {
    return /^[0-9]+$/.test(quantity);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isAdd ? (
          <div
            className="flex font-sans text-gray-700 p-3 rounded-xl bg-slate-300 hover:bg-slate-400 m-4 cursor-pointer items-center"
            ref={buttonRef}
            onClick={() => {
              setWarning("");
              setName("");
              setCategory("");
              setPrice("");
              setQuantity(0);
              setImage(null);
            }}
          >
            <IoMdAddCircle className="text-2xl mr-2" />
            <p className="font-bold truncate">Add New Menu</p>
          </div>
        ) : (
          <div
            className="mt-1 font-bold text-blue-500 hover:bg-gray-300 p-1 rounded-full text-lg ml-3 mb-2 hover:p-2 hover:text-sm cursor-pointer"
            ref={buttonRef}
            onClick={() => {
              setWarning("");
              setName(menu.name);
              setCategory(menu.category);
              setPrice(menu.price);
              setQuantity(menu.quantity);
              setImage(null);
            }}
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
              <option value="NON_VEG">Non-Veg</option>
              <option value="VEGAN">Vegan</option>
              <option value="DRINK">Drink</option>
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
              step="1"
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

              if (price.toString().includes("-")) {
                setWarning("Price must be a positive value");
                return;
              }

              if (!isValidQuantity(quantity)) {
                setWarning("Quantity must be a positive integer");
                return;
              }

              const data = new FormData();
              if (!isAdd) {
                data.append("id", menu.id);
              }
              data.append("name", name);
              data.append("category", category);
              data.append("price", price);
              data.append("quantity", quantity);
              data.append("file", image);
              data.append("restaurantId", localStorage.getItem("restaurantId"));

              try {
                if (isAdd) {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/menu/addMenu`,
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (response.status == 200) {
                    setToastMessage("Menu added successfully");
                    setMenu((prev) => [...prev, response.data]);
                    buttonRef && buttonRef.current && buttonRef.current.click();
                  }
                } else {
                  const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/menu/updateMenu`,
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (response.status == 200) {
                    setToastMessage("Menu updated successfully");
                    setMenu((prev) => {
                      const index = prev.findIndex(
                        (item) => item.id === menu.id
                      );
                      prev[index] = response.data;
                      return prev;
                    });
                    buttonRef && buttonRef.current && buttonRef.current.click();
                  }
                }
              } catch (error) {
                console.log("Error:", error);
                if (error.response.status === 400) {
                  setWarning("Duplicate Menu name");
                }
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
