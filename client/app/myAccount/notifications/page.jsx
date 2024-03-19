import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
  {
    title:
      "Your call has been confirmed. hggggggggggggggg ggggggggggggggggggggggg gggggggggggggggggg ggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggg",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export default function CardDemo({ className, ...props }) {
  return (
    <div className="w-full flex justify-center">
      <Card
        className={cn(
          "w-full max-w-[50rem] h-full overflow-y-auto rounded-none border-none shadow-none bg-transparent",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle className="flex gap-2 text-lg items-center">
            <IoNotificationsOutline className="text-xl" /> Notifications
          </CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr_25px] items-start pb-2 last:mb-0 shadow-md bg-base-400 rounded-md p-2"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 my-auto" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              <MdOutlineDeleteOutline className="my-auto text-lg cursor-pointer" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full max-w-[40rem] mx-auto">
            Remove all notifications
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
