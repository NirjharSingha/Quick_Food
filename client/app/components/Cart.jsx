import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Cart = ({ data, quantity, total, restaurantName }) => {
  return (
    <div
      className="max-w-[42.5rem] mt-1 rounded-md mx-auto overflow-y-auto shadow-md shadow-gray-400 p-5"
      style={{ height: "calc(100% - 4.75rem)" }}
    >
      <div className="flex justify-center items-center mb-3">
        <FaShoppingCart className="mr-2 text-4xl text-gray-700" />
        <p className="font-serif text-3xl font-bold text-gray-700">Cart</p>
      </div>
      <div className="w-full h-[9rem] p-1 shadow-md border-gray-300 border-[0.1px] shadow-gray-300 rounded-xl flex gap-3 mb-3">
        <img
          src="/foodDelivery.png"
          alt="logo"
          className="w-[11.5rem] h-[8.5rem] rounded-lg"
        />
        <div className="h-full flex flex-col justify-center w-full overflow-hidden">
          <p className="text-2xl font-bold text-gray-700 truncate font-sans mb-2">
            {restaurantName}
          </p>
          <p className="text-md font-sans text-gray-500">
            Estimated Delivery :
          </p>
          <p className="text-md font-sans text-gray-500">Within 30 minutes</p>
        </div>
      </div>
      <Table>
        <TableCaption>Your selected food items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[8rem]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right w-[100px] min-w-[100px]">
              Price
            </TableHead>
            <TableHead className="text-right w-[90px] min-w-[90px]">
              Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((cartItem, index) => (
            <TableRow key={cartItem.id}>
              <TableCell>
                <img
                  src={
                    cartItem.image === null
                      ? "/Menu.jpg"
                      : `data:image/jpeg;base64,${cartItem.image}`
                  }
                  alt="logo"
                  className="w-[6.5rem] min-w-[6.5rem] h-[4.5rem] min-h-[4.5rem] rounded-md shadow-md shadow-gray-400"
                />
              </TableCell>
              <TableCell className="truncate">{cartItem.name}</TableCell>
              <TableCell className="text-right">{cartItem.price}</TableCell>
              <TableCell className="text-right">{quantity[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-3 w-full font-sans font-bold text-lg truncate text-right text-gray-600">
        Total : {total} Tk
      </p>
    </div>
  );
};

export default Cart;
