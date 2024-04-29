"use client";

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
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const DashboardTable = ({ data }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (id) => {
    if (pathname.includes("restaurants")) {
      router.push(`/admin/restaurants/${id}`);
    } else {
      router.push(`/admin/riders/${id}`);
    }
  };

  return (
    <Table>
      <TableCaption>
        {pathname.includes("restaurants") ? "All Restaurants" : "All Riders"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[8rem] text-center">Image</TableHead>
          <TableHead className="text-center">ID</TableHead>
          <TableHead className="text-center">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            onClick={() => {
              handleClick(item.id);
            }}
            className="cursor-pointer"
          >
            <TableCell>
              <img
                src={
                  item.image === null
                    ? `${
                        pathname.includes("restaurants")
                          ? "/Restaurant.jpeg"
                          : "/user.svg"
                      }`
                    : `data:image/jpeg;base64,${item.image}`
                }
                alt="logo"
                className="w-[6.5rem] min-w-[6.5rem] h-[4.5rem] min-h-[4.5rem] rounded-md shadow-md shadow-gray-400 mx-auto"
              />
            </TableCell>
            <TableCell className="truncate text-xs sm:text-sm text-center">
              {item.id}
            </TableCell>
            <TableCell className="text-xs sm:text-sm text-center">
              {item.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;

// responsive
