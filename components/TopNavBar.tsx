"use client";
import Link from "next/link";

export default () => {
  return (
    <span className="flex justify-between">
      <h1 className="text-xl">LOGO</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/user/login">Login</Link>
        </li>
        
      </ul>
    </span>
  );
};