"use client";

import React from "react";
import Image from "next/image";
import Menu from "@/public/Menu.jpg";
import { FaStar } from "react-icons/fa";
import MenuDialog from "./MenuDialog";
import { usePathname } from "next/navigation";
import { IoAddCircle } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useGlobals } from "../contexts/Globals";
import { FaCircleMinus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import axios from "axios";
import { handleUnauthorized } from "@/app/utils/unauthorized";

const MenuCard = ({ menu, setMenuList }) => {
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(0);
  const { setCartCount } = useGlobals();
  const cartAlertRef = useRef(null);
  const { setToastMessage, setIsLoggedIn } = useGlobals();
  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getRating = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/review/menuRating?menuId=${menu.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setRating(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };
    getRating();
  }, []);

  useEffect(() => {
    if (pathname.includes("/orderFood")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        cart.selectedMenu.forEach((item) => {
          if (item.selectedMenuId === menu.id) {
            setQuantity(item.selectedMenuQuantity);
          }
        });
      }
    }
  }, []);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    // Ensure cart exists, if not create an empty one
    if (!cart) {
      cart = { restaurantId: menu.restaurantId, selectedMenu: [] };
    }

    if (cart.restaurantId !== menu.restaurantId) {
      // handle warning
      cartAlertRef && cartAlertRef.current && cartAlertRef.current.click();
      return;
    }

    // Check if the menu already exists in the cart
    const existingMenu = cart.selectedMenu.find(
      (item) => item.selectedMenuId === menu.id
    );

    if (existingMenu) {
      // If the menu exists, update its quantity
      existingMenu.selectedMenuQuantity++;
    } else {
      // If the menu doesn't exist, push a new entry into the array
      cart.selectedMenu.push({
        selectedMenuId: menu.id,
        selectedMenuQuantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(1);
    setCartCount((prev) => prev + 1);
  };

  const updateQuantity = (isAdd) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.selectedMenu.forEach((item) => {
      if (item.selectedMenuId === menu.id) {
        if (isAdd) {
          item.selectedMenuQuantity += 1;
        } else {
          item.selectedMenuQuantity -= 1;
          if (item.selectedMenuQuantity === 0) {
            cart.selectedMenu = cart.selectedMenu.filter(
              (menu) => menu.selectedMenuId !== item.selectedMenuId
            );
            setCartCount((prev) => prev - 1);
          }
        }
        setQuantity(item.selectedMenuQuantity);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div
      className={`w-[26vw] min-w-[18rem] max-w-[22rem] ${
        pathname.includes("/yourRes") ? "h-[20rem]" : "h-[18.6rem]"
      } rounded-lg shadow-md bg-base-100 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg`}
    >
      <Alert
        buttonRef={cartAlertRef}
        title={"Food Selected From Different Restaurants!"}
        message={
          "You cannot order food from different restaurants at the same time. If you select this food item, the previous items will be removed from the cart. Do you want to continue?"
        }
        cancelHandler={() => {
          cartAlertRef.current.click();
        }}
        continueHandler={() => {
          const resId = pathname.split("/").pop();
          let cart = {
            restaurantId: resId,
            selectedMenu: [
              { selectedMenuId: menu.id, selectedMenuQuantity: 1 },
            ],
          };
          localStorage.setItem("cart", JSON.stringify(cart));
          setCartCount(1);
          setQuantity(1);
          cartAlertRef.current.click();
        }}
      />
      {menu.image ? (
        <img
          src={`data:image/jpeg;base64,${menu.image}`}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      ) : (
        <Image
          placeholder="blur"
          src={Menu}
          alt="logo"
          className="bg-red-100 w-full h-[10rem] rounded-tl-lg rounded-tr-lg border-b-2 border-b-gray-200"
        />
      )}
      <p className="text-lg font-bold text-gray-700 mt-2 pl-3 pr-3 truncate">
        {menu.name}
      </p>
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Category :{" "}
        {menu.category
          ? menu.category === "NON_VEG"
            ? "NON-VEG"
            : menu.category
          : "Category Not Available"}
      </p>
      {!pathname.includes("/orderFood") && (
        <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
          Available quantity :{" "}
          {menu.quantity > 0 ? menu.quantity : "Not Available"}
        </p>
      )}
      <p className="text-sm text-gray-600 mt-1 pl-3 pr-3 truncate">
        Price : {menu.price ? `${menu.price} Tk` : "Not Available"}
      </p>
      <div className="flex justify-between items-center mt-1">
        {pathname.includes("/yourRes") && (
          <MenuDialog isAdd={false} menu={menu} setMenuList={setMenuList} />
        )}
        {pathname.includes("/orderFood") && (
          <div
            className={`mt-1 flex gap-1 w-[8rem] justify-center items-center font-bold border-2 border-solid rounded-sm text-sm pt-[2px] pb-[2px] ml-3 mb-2 ${
              quantity === 0
                ? "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              if (quantity === 0) {
                addToCart();
              }
            }}
          >
            {quantity === 0 ? (
              <>
                <IoAddCircle className="text-xl" /> Add to Cart
              </>
            ) : (
              <div className="w-full flex items-center justify-around">
                <FaCircleMinus
                  className="text-xl text-gray-700 cursor-pointer"
                  onClick={() => updateQuantity(false)}
                />
                <p className="text-gray-700">{quantity}</p>
                <IoAddCircle
                  className="text-2xl text-blue-500 cursor-pointer"
                  onClick={() => updateQuantity(true)}
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-1 flex gap-1 w-[5rem] justify-center items-center font-bold text-white bg-green-700 rounded-sm text-sm pt-1 pb-1 mr-3 mb-2">
          {rating === "" ? (
            <p className="text-[0.75rem] truncate">No Rating</p>
          ) : (
            <>
              {rating.toFixed(2)} <FaStar />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
