"use client";
import Button from "@/app/elements/button";
import ButtonLink from "@/app/elements/link";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import S from "@/app/styles/DropDown.module.css";
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
      buttonClass="login-btn text-[16px] lg:text-[20px] font-semibold px-5 py-2 rounded-full text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md"
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
        className="text-[16px] gap-[10px] lg:text-[20px] flex justify-center items-center font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white"
      >
        {postDetailsIcon}
        Post Listing
      </a>
      {logoutButton}
    </>
  );
}

import { Menu } from "@mantine/core";
import data from "@/app/data/dropdown";
import { postDetailsIcon } from "@/app/images/commonSvgs";

function Dropdown() {
  const { data: session } = useSession();
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <button className="login-btn text-[20px] font-semibold px-5 py-2 rounded-full flex flex-row-reverse justify-center gap- items-center text-[#0073C6] border-none underline bg-gradient-to-r from-[#EFF8FF] to-[#FFF] shadow-md">
          <Image width={30} height={30} alt="logout" src="/burger.svg" />{" "}
          {session?.user.userName}
        </button>
      </Menu.Target>

      <Menu.Dropdown
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
          onClick={() => signOut()}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function Test() {
  return (
    <>
      <nav className="bg-white rounded-lg shadow p-4 w-48">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block text-gray-700 hover:text-green-500 transition-colors"
            >
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-gray-700 hover:text-green-500 transition-colors"
            >
              Post Project
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-gray-700 hover:text-green-500 transition-colors"
            >
              Post Listing
            </a>
          </li>
          <li>
            <a href="#" className="block text-green-600 font-semibold">
              About us
            </a>
            <hr className="border-green-600 my-2" />
          </li>
          <li>
            <a
              href="#"
              className="block text-gray-700 hover:text-green-500 transition-colors"
            >
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
