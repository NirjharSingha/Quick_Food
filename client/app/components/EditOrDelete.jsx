"use client";

import React from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef } from "react";

const EditOrDelete = ({
  setShowEditOrDelete,
  flag,
  deleteHandler,
  editHandler,
}) => {
  const Ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        setShowEditOrDelete(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`flex justify-center flex-col p-1 gap-2 z-50 bg-white rounded-md shadow-md shadow-slate-300 ${
        flag ? "mb-6" : ""
      }`}
      ref={Ref}
    >
      <div
        className="flex items-center gap-3 p-1 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-300"
        onClick={editHandler}
      >
        <MdModeEdit className="text-gray-700" />
        <p className="text-xs font-bold">Edit</p>
      </div>
      <div
        className="flex items-center gap-3 p-1 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-300"
        onClick={deleteHandler}
      >
        <MdDelete className="text-gray-700" />
        <p className="text-xs font-bold">Delete</p>
      </div>
    </div>
  );
};

export default EditOrDelete;
