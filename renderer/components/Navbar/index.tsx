import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex flex-row justify-between">
        <div className="flex">
          <a className="font-bold normal-case text-xl">
            Fatwa Kehidupan{" "}
            <span className="text-clip font-light">
              Convert Excel Baksos Report
            </span>
          </a>
        </div>
        {/* <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/anggota">
                <a>Anggota</a>
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="flex flex-row justify-around space-x-8">
          <Link href="/home">
            <a>Home</a>
          </Link>
          <Link href="/anggota">
            <a>Anggota</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
