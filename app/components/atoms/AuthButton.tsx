"use client";
import Button from "@/app/elements/button";
import ButtonLink from "@/app/elements/link";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import S from "@/app/styles/DropDown.module.css";
import { deleteCookie } from "cookies-next";

export default function AuthButton() {
  const { data: session } = useSession();

  const postProjectLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/project/postProject`
    : "/login";

  const postListingLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/property/v1/post`
    : "/login";

  const logoutButton = session?.user ? (
    <Dropdown />
  ) : (
    <ButtonLink
      href="/login"
      buttonClass="login-btn text-[12px] md:text-[16px] lg:text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
      title="Login/ Sign up"
    />
  );

  return (
    <>
      {session && (
        <a
          target="_blank"
          href={postProjectLink}
          className="text-[16px] gap-[10px] lg:text-[20px] flex justify-center items-center font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white"
        >
          {postDetailsIcon}
          Post Your Project
        </a>
      )}
      <a
        target="_blank"
        href={postListingLink}
        className="hidden md:flex text-[12px] py-1 px-1 gap-[10px] lg:text-[20px]  justify-center items-center font-semibold md:px-5 bg-[#227FBC] md:py-1.5 rounded-xl text-white"
      >
        {postDetailsIcon}
        Post Listing
      </a>
      <Dropdown />
      {/* {logoutButton} */}
    </>
  );
}

import { Menu } from "@mantine/core";
import data, { unAuthorizedData } from "@/app/data/dropdown";
import { postDetailsIcon } from "@/app/images/commonSvgs";

function Dropdown() {
  const handleLogout = async () => {
    try {
      await signOut();
      deleteCookie("token");
    } catch (error) {
      console.log(error);
    }
  };
  const { data: session } = useSession();
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        {session ? (
          <button className="login-btn text-[20px] font-semibold px-5 py-2 rounded-full flex flex-row-reverse justify-center gap- items-center text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md">
            <Image width={30} height={30} alt="logout" src="/burger.svg" />{" "}
            {session?.user.name}
          </button>
        ) : (
          <div className="login-btn text-[20px] font-semibold px-5 py-2 rounded-full flex flex-row-reverse justify-center gap- items-center text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md">
            <Image width={30} height={30} alt="logout" src="/burger.svg" />{" "}
            <Link href={"/login"} className="text-[16px] mr-1">
              Login/Singup
            </Link>
          </div>
        )}
      </Menu.Target>
      {session ? (
        <>
          <Menu.Dropdown
            className="!z-[1000]"
            classNames={{
              dropdown: S.dropdown,
            }}
          >
            {data.map((item, index) => (
              <Menu.Item
                key={index}
                classNames={{
                  itemLabel: S.itemLabel,
                }}
                component="a"
                className="block text-gray-700 hover:text-green-500 transition-colors"
                href={item.url}
                target="_blank"
              >
                {item.label}
              </Menu.Item>
            ))}
            <hr className=" bg-[#768AA9] h-0.5 max-w-[90%] m-auto" />
            <Menu.Item
              classNames={{
                itemLabel: S.itemLabel,
              }}
              component="button"
              className="block text-gray-700 hover:text-green-500 transition-colors"
              onClick={handleLogout}
            >
              Log Out
            </Menu.Item>
          </Menu.Dropdown>
        </>
      ) : (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          {unAuthorizedData.map((item, index) => (
            <Menu.Item
              key={index}
              classNames={{
                itemLabel: S.itemLabel,
              }}
              component="a"
              className="block text-gray-700 hover:text-green-500 transition-colors"
              href={item.url}
              target="_blank"
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
