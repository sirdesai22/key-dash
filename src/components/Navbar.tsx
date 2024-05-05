'use client'
import { auth } from "@/config/firebase-config";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
    const [user, setUser] = useState("John Doe");

    const handleSignout = () => {
        try {
          signOut(auth);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="w-full text-white py-2 flex items-center justify-between px-5 absolute top-0">
      <h1 className="text-xl font-semibold">Hello, {auth?.currentUser?.displayName}</h1>
      <div className="flex gap-3">
        <button onClick={handleSignout} className="bg-red-500 hover:bg-red-600 px-5 rounded-md font-semibold">Sign out</button>
      <Image
        height={40}
        width={40}
        src="/profile_pic.png"
        alt="Picture of the author"
        className="rounded-full cursor-pointer"
        onClick={() => {window.location.href = "/dashboard"}}
      />
      </div>
    </div>
  );
};

export default Navbar;
