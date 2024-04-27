"use client";

import React from "react";
import Loading from "@/app/components/Loading";
import { useState } from "react";
import { useGlobals } from "@/app/contexts/Globals";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleUnauthorized } from "@/app/utils/unauthorized";
import Alert from "@/app/components/Alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaStar } from "react-icons/fa";

const page = ({ params }) => {
  const { orderId } = params;
  const [showLoading, setShowLoading] = useState(true);
  const { setToastMessage, setIsLoggedIn, windowWidth } = useGlobals();
  const router = useRouter();
  const alertRef = useRef(null);
  const [pageData, setPageData] = useState({});
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const getPage = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/review/getReviewPage?orderId=${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setShowLoading(false);
          setPageData(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          handleUnauthorized(setIsLoggedIn, setToastMessage, router);
        }
      }
    };

    getPage();
  }, []);

  const handleRatingChange = (event, menuId) => {
    const selectedRating = parseFloat(event.target.value);
    setRating((prevRating) => {
      const existingRatingIndex = prevRating.findIndex(
        (item) => item.menuId === menuId
      );

      if (existingRatingIndex !== -1) {
        // If rating with menuId exists, update its rating
        return prevRating.map((item, index) => {
          if (index === existingRatingIndex) {
            return { ...item, rating: selectedRating };
          }
          return item;
        });
      } else {
        // If rating with menuId doesn't exist, add new rating
        return [...prevRating, { menuId, rating: selectedRating }];
      }
    });
  };

  const handleSubmitRating = async () => {
    let flag = false;
    rating.forEach((item) => {
      if (item.rating !== 0) {
        flag = true;
      }
    });
    if (!flag) {
      setToastMessage("Please give rating to at least one item");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/review/submitReview?orderId=${orderId}`,
        rating,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alertRef.current.click();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        handleUnauthorized(setIsLoggedIn, setToastMessage, router);
      }
    }
  };

  return (
    <>
      <Alert
        buttonRef={alertRef}
        title={"Thanks for your rating"}
        message={
          "Thanks for giving your valuable feedback to us. This will help us to improve our sercices in future."
        }
        continueHandler={() => {
          alertRef.current.click();
          router.push("/orderFood/submitRating");
        }}
        flag={true}
      />
      <div className="bg-slate-100 h-full w-full">
        {showLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!showLoading && (
          <div className="h-full">
            <div
              className="max-w-[42.5rem] mt-1 rounded-md mx-auto overflow-y-auto shadow-md shadow-gray-400 p-5 pl-1 pr-1 md:pl-5 md:pr-5"
              style={{ height: "calc(100% - 4.75rem)" }}
            >
              <div className="flex justify-center items-center mb-3">
                <FaStar className="mr-2 text-4xl text-gray-700" />
                <p className="font-serif text-3xl font-bold text-gray-700">
                  Rating
                </p>
              </div>
              <div className="w-full h-[9rem] p-1 shadow-md border-gray-300 border-[0.1px] shadow-gray-300 rounded-xl flex gap-3 mb-3">
                <img
                  src={
                    pageData.restaurantPic === null
                      ? "/Restaurant.jpeg"
                      : `data:image/jpeg;base64,${pageData.restaurantPic}`
                  }
                  alt="logo"
                  className="w-[11.5rem] max-w-[50%] h-[8.5rem] rounded-lg"
                />
                <div className="h-full flex flex-col justify-center w-full overflow-hidden">
                  <p className="text-lg sm:text-2xl font-bold text-gray-700 truncate font-sans mb-2">
                    {pageData.restaurantName}
                  </p>
                  <p className="text-sm sm:text-base font-sans text-gray-500">
                    Give rating to the food
                    {windowWidth > 390 && <br />}
                    {windowWidth < 390 && " "}you ordered from here
                  </p>
                </div>
              </div>
              <Table>
                <TableCaption>Food items to give rating</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[8rem] text-center">
                      Image
                    </TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center w-[130px] min-w-[100px]">
                      Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.menuItems &&
                    pageData.menuItems.map((menuItem) => (
                      <TableRow key={menuItem.id}>
                        <TableCell>
                          <img
                            src={
                              menuItem.image === null
                                ? "/Menu.jpg"
                                : `data:image/jpeg;base64,${menuItem.image}`
                            }
                            alt="logo"
                            className="w-[6.5rem] min-w-[6.5rem] h-[4.5rem] min-h-[4.5rem] rounded-md shadow-md shadow-gray-400"
                          />
                        </TableCell>
                        <TableCell className="truncate text-center">
                          {menuItem.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <select
                            className="select select-primary w-full max-w-xs rounded-full text-purple-600"
                            onChange={(event) =>
                              handleRatingChange(event, menuItem.id)
                            }
                          >
                            <option value={0}>Rating</option>
                            <option value={0.5}>0.5 &#9733;</option>
                            <option value={1}>1.0 &#9733;</option>
                            <option value={1.5}>1.5 &#9733;</option>
                            <option value={2}>2.0 &#9733;</option>
                            <option value={2.5}>2.5 &#9733;</option>
                            <option value={3}>3.0 &#9733;</option>
                            <option value={3.5}>3.5 &#9733;</option>
                            <option value={4}>4.0 &#9733;</option>
                            <option value={4.5}>4.5 &#9733;</option>
                            <option value={5}>5.0 &#9733;</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div
              className={`w-full max-w-[42.5rem] mx-auto h-8 bg-gray-300 font-sans font-bold mt-5 mb-5 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer`}
              onClick={handleSubmitRating}
            >
              Submit Rating
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;

// responsive
