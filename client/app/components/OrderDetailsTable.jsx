import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderDetailsTable = ({ data, quantity }) => {
  return (
    <Table>
      <TableCaption>Selected food items.</TableCaption>
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
  );
};

export default OrderDetailsTable;
