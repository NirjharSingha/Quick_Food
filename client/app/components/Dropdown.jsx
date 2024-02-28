"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { useGlobals } from "../contexts/Globals";
import { MdDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";

export function Dropdown({ setIsUserLogin, setShowLogin, setShowSignUp }) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useGlobals();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isLoggedIn && (
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Login</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsUserLogin(true);
                      setShowLogin(true);
                    }}
                  >
                    User Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsUserLogin(false);
                      setShowLogin(true);
                    }}
                  >
                    Employee Login
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => {
                setShowSignUp(true);
              }}
            >
              Sign up
              <DropdownMenuShortcut>
                <CiLogin className="mr-1 text-lg" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {isLoggedIn && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
              <DropdownMenuShortcut>
                <MdDashboard className="mr-1 text-lg" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                setIsLoggedIn(false);
                router.push("/");
              }}
            >
              Log out
              <DropdownMenuShortcut>
                <CiLogout className="mr-1 text-lg" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
