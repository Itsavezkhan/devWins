"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
import axios from "axios";
import { UseDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";

export default function Header() {
  // const [user, setUser] = useState<string | null>("Darlene");
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.users);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/auth/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <header className="h-16 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6">
      <div className="flex items-center space-x-4">
        {user && (
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hello {user.name} 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Let’s check your stats today!
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="px-2 py-1 bg-black text-white rounded-lg">
          {user?.provider === "google" ? (
            <p    onClick={() => {
    window.location.href = "http://localhost:5001/auth/login/github";
  }}
 >Connect with github</p>
          ) : (
            user?.provider === "github" && <p>Connected</p>
          )}
        </div>
        {user ? (
          <>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
