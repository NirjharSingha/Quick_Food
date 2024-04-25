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
import { useRef, useState } from "react";
import { LuListFilter } from "react-icons/lu";

const Filter = ({
  nameFilter,
  setNameFilter,
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
}) => {
  const buttonRef = useRef(null);
  const [name, setName] = useState(nameFilter);
  const [category, setCategory] = useState(categoryFilter);
  const [price, setPrice] = useState(priceFilter);
  const [rating, setRating] = useState(ratingFilter);
  const [warning, setWarning] = useState("");

  function isValidPositiveNumber(str) {
    // Regular expression to match a valid positive number format (including decimal numbers)
    const positiveNumberPattern = /^\d+(\.\d+)?$/;

    // Test if the string matches the positive number pattern
    return positiveNumberPattern.test(str);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex items-center bg-white p-1 pl-2 pr-2 rounded-full cursor-pointer hover:p-2"
          ref={buttonRef}
          onClick={() => {
            setName(nameFilter);
            setCategory(categoryFilter);
            setPrice(priceFilter);
            setRating(ratingFilter);
          }}
        >
          <p className="font-bold text-sm font-sans text-gray-700">
            Apply Filters
          </p>
          <LuListFilter className="text-gray-700 text-lg ml-2" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[100svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription className="mb-2 mt-3">
            Apply your prefered filters.
          </DialogDescription>
        </DialogHeader>
        <p className="font-sans text-sm text-red-600 w-full text-center">
          {warning}
        </p>
        <div className="grid grid-cols-3 mb-3 items-center">
          <Label htmlFor="accountId" className="text-left text-sm truncate">
            Name :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="name"
              type="text"
              name="name"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Name contains"
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
            Category :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <select
              className="select select-ghost w-full"
              value={category}
              onChange={(e) => {
                setWarning("");
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
            Price :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="price"
              type="number"
              name="price"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Not more than"
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
            Rating :
          </Label>
          <div className="flex items-center indent-2 rounded-2xl border-b-2 rounded-b-none col-span-2">
            <input
              id="rating"
              type="number"
              name="rating"
              className="indent-2 rounded outline-none cursor-pointer font-sans"
              placeholder="Minimum Rating"
              value={rating}
              required={true}
              onChange={(e) => {
                setWarning("");
                setRating(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-[6rem] font-bold"
            onClick={() => {
              if (price.toString().includes("-")) {
                setWarning("Price must be a positive value");
                return;
              }
              if (!isValidPositiveNumber(rating.toString()) && rating !== "") {
                setWarning("Invalid rating value");
                return;
              }
              if (parseFloat(rating) > 5) {
                setWarning("Rating must be less than or equal to 5");
                return;
              }
              setNameFilter(name);
              setCategoryFilter(category);
              setPriceFilter(price);
              setRatingFilter(rating);

              buttonRef && buttonRef.current && buttonRef.current.click();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;

// responsive
