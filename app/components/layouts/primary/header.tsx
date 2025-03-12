"use client";
import { Menu } from "@mantine/core";
import Image from "next/image";
import React from "react";
import data, { unAuthorizedData } from "@/app/data/dropdown";
import S from "@/app/styles/DropDown.module.css";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import usePathToOrigin, { encryptUrl } from "@/app/hooks/custom/useRedirect";
import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
import Btn from "@/app/(dashboard)/new/components/post-your-listing/Btn";
import PostProjectBtn from "@/app/(dashboard)/new/components/PostProjectBtn";
import MenuBtn from "@/app/(dashboard)/new/components/home-search/header/Menu";
import { GrpLogoSvg } from "@/app/images/getrightLogo";
import { usePathname } from "next/navigation";
import { homePageSvgsMap } from "@/app/images/commongsSvgs2";

type Props = {};

export default function Header({}: Props) {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const pathname = usePathname();
  return (
    ![
      "/login",
      "/register",
      "/register/individual",
      "/register/agent",
      "/register/builder",
      "/forgot",
    ].includes(pathname) && (
      <div
        className={`flex h-[70px] items-center justify-between shrink-0 p-1 pl-2 sm:pl-5 w-full py-3 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.20)] bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1]  to-[#bde3ff] fixed top-0 z-[20] `}
      >
        <Link 
           prefetch={false}
          href={"/"}
          className={` ${pathname === "/" ? "pointer-events-none" : ""}`}
        >
        
          <GrpLogoSvg className="h-[40px]   sm:h-[50px] w-auto" />
        </Link>
        {isMobile ? (
          <div className="flex  sm:hidden mr-4 gap-4">
            <Btn />
            <MobileDropDown />
          </div>
        ) : (
          <div className="sm:flex items-center justify-center gap-[30px] mr-[40px] hidden">
            <a href={"/blog"} target="_blank" rel="noopener noreferrer">
    
             
              <p className="text-[#242424] text-xl not-italic font-medium cursor-pointer">
                Blogs
              </p>
            </a>
            <ForBuilders />
            <PostProjectBtn />
            <Btn />
            <Dropdown />
          </div>
        )}
      </div>
    )
  );
}

const ForBuilders = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    !session && (
      <Menu trigger="click-hover">
        <Menu.Target>
          <button className="text-[#242424] text-xl not-italic font-medium inline-flex gap-2 justify-center items-center">
            For Builders {config.chevron}
          </button>
        </Menu.Target>
        <Menu.Dropdown
          className="!p-0 cursor-pointer"
          onClick={() =>
            window.open(
              `/login?cc=${encryptUrl(pathName)}`,
            )
          }
        >
          <div className="w-[387px] h-[178px] shrink-0 rounded border shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-solid border-[#C5C2DD] bg-gradient-to-r from-[#f5f5f5] to-[#ffeacc] p-6">
            <div>
              <p className="text-[#F5AC44] text-lg not-italic font-bold">
                Calling Builders!!!
              </p>
            </div>
            <div className="text-[#242424] text-xs not-italic font-semibold">
              To Post Project Free!
            </div>
            <ul className="ml-5 mt-3">
              <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                Free Posting
              </li>
              <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                Multiple Images
              </li>
              <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                Easy to post
              </li>
            </ul>
            <button className="inline-flex justify-center items-center gap-2.5 rounded px-2.5 py-1 bg-[#0073C6] text-white text-xs not-italic font-bold mt-2">
              Post Project
            </button>
          </div>
          <Image
            src={"/home/for_builder.svg"}
            alt=""
            width={220}
            height={220}
            className="absolute right-0 bottom-0"
          />
        </Menu.Dropdown>
      </Menu>
    )
  );
};

function Dropdown() {
  const handleLogout = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        await signOut();
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`);
      } else {
        await axios
          .get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`)
          .then(() => {
            signOut();
          });
      }
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  const { redirectQueryParam } = usePathToOrigin();
  const { data: session } = useSession();
  return (
    <Menu width={200} shadow="md" trigger="click-hover">
      <Menu.Target>
        {session ? (
          <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
            <button className="inline-flex justify-center items-center gap-1 ">
              {config.getIcon(session.user.userType)}{" "}
              {
                /* session.user.name.split(" ")[0].length >= 3
                ? session.user.name.split(" ")[0]
                : session.user.name.split(" ")[1] != undefined
                ? session.user.name.split(" ")[1]
                : session.user.name.split(" ")[0] */
                session.user.name.slice(0, 10)
              }
              {`${session.user.name.length > 8 ? "..." : ""}`}
            </button>
            {config.blueChevron}
          </div>
        ) : (
          <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
            <Link
              rel="noopener noreferrer"
              className=""
              href={{
                pathname: `/register`,
                search: redirectQueryParam,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Login/ Sign up
            </Link>
            {config.blueChevron}
          </div>
        )}
      </Menu.Target>
      {session ? (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          <>
            {data.map((item, index) =>
              session.user?.userType !== "B" &&
              item.label === "Post Project" ? null : (
                <Menu.Item
                  key={`dataCrad_${item.label + (index + 1)}`}
                  classNames={{
                    itemLabel: S.itemLabel,
                    item: S.item,
                  }}
                  component="a"
                  className=" text-gray-700 hover:text-green-500 transition-colors flex"
                  href={item.url}
                  // target="_blank"
                >
                  <div className="flex items-center gap-2">
                    {homePageSvgsMap.get(item.svg ?? "")}{" "}
                    <span>{item.label}</span>
                  </div>
                </Menu.Item>
              )
            )}
            <hr className=" bg-[#768AA9] h-0.5 max-w-[90%] m-auto" />
          </>

          <Menu.Item
            classNames={{
              itemLabel: S.itemLabel,
            }}
            component="button"
            className="block text-gray-700 hover:text-green-500 transition-colors"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2">
              {homePageSvgsMap.get("logout")} <span>Log Out</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          {unAuthorizedData.map((item, index) => (
            <Menu.Item
              key={item.url}
              classNames={{
                itemLabel: S.itemLabel,
              }}
              component={Link}
              className="block text-gray-700 hover:text-green-500 transition-colors"
              href={{
                pathname: item.url,
                search: redirectQueryParam,
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
const config = {
  chevron: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#33535F" />
    </svg>
  ),
  blueChevron: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M0 0.5L4.29289 4.79289C4.68342 5.18342 5.31658 5.18342 5.70711 4.79289L10 0.5H0Z"
        fill="#0073C6"
      />
    </svg>
  ),
  logo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/getrightpropertylogo.png`,
  getIcon: (type: string) => {
    const data = {
      B: {
        color: "bg-[#00C5CC]",
        text: "B",
      },
      I: {
        color: "bg-[#9ADB7C]",
        text: "In",
      },
      A: {
        color: "bg-[#FFE53B]",
        text: "A",
      },
    };
    return (
      <span
        className={clsx(
          "flex flex-col justify-center items-center gap-2.5 rounded px-1 text-white",
          `${data[type as keyof typeof data].color}`
        )}
      >
        {data[type as keyof typeof data].text}
      </span>
    );
  },
};

function MobileDropDown() {
  const handleLogout = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        await signOut();
        await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/logOut`
        );
      } else {
        await axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/logOut`)
          .then(() => {
            signOut();
          });
      }
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  const { redirectQueryParam } = usePathToOrigin();
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 601px)");

  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        {session ? (
          <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
            <button className="inline-flex justify-center items-center gap-1">
              {config.getIcon(session.user.userType)}
            </button>
            {config.blueChevron}
          </div>
        ) : (
          <div className="w-full min-h-full flex justify-center items-center">
            <MenuBtn />
          </div>
        )}
      </Menu.Target>
      {session ? (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          <>
            {data.map((item, index) =>
              session.user?.userType !== "B" &&
              item.label === "Post Project" ? null : index == 0 && isMobile ? (
                <button
                  onClick={() =>
                    window.open(
                      `${process.env.NEXT_PUBLIC_PROJECT_URL}/your-profile/dashboard`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                  className={`rounded w-full pl-3 text-wrap flex items-center gap-2 text-[14px] text-gray-700 hover:text-green-500 transition-colors p-1 capitalize ${
                    session.user.userType == "A"
                      ? "bg-[#FFFCE7]"
                      : session.user.userType == "B"
                      ? "bg-[#dff8f8]"
                      : "bg-[#D9F1CD]"
                  }`}
                >
                  {config.getIcon(session.user.userType)}{" "}
                  {session.user.name.split(" ")[0].length >= 3
                    ? session.user.name.split(" ")[0]
                    : session.user.name.split(" ")[1] != undefined
                    ? session.user.name.split(" ")[1]
                    : session.user.name.split(" ")[0]}
                </button>
              ) : (
                <Menu.Item
                  key={`dataCrad_${item.label[index]}`}
                  classNames={{
                    itemLabel: S.itemLabel,
                    item: S.item,
                  }}
                  component="a"
                  className=" text-gray-700 hover:text-green-500 transition-colors flex"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center gap-2">
                    {homePageSvgsMap.get(item.svg ?? "")}{" "}
                    <span>{item.label}</span>
                  </div>
                </Menu.Item>
              )
            )}
            <hr className=" bg-[#768AA9] h-0.5 max-w-[90%] m-auto" />
          </>

          <Menu.Item
            classNames={{
              itemLabel: S.itemLabel,
            }}
            component="button"
            className="block text-gray-700 hover:text-green-500 transition-colors"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2">
              {homePageSvgsMap.get("logout")} <span>Log Out</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          {unAuthorizedData.map((item, index) => (
            <Menu.Item
              key={item.url}
              classNames={{
                itemLabel: S.itemLabel,
              }}
              component={Link}
              className="block text-gray-700 hover:text-green-500 transition-colors"
              href={{
                pathname: item.url,
                search: redirectQueryParam,
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
