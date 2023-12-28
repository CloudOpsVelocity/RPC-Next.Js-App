import Blogs from "./components/molecules/blogs"
import HomeSearch from "./components/molecules/home-search"
import WhyCHoose from "./components/molecules/whychoose"
import YourList from "./components/molecules/your-llist"

import style from "./styles/home.module.css"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {

  return (
 <div className="h-[100%] w-[100%] flex justify-center items-center flex-col">
    <HomeSearch/>
    <WhyCHoose />
    <YourList/>
    <Blogs/>
 </div>
  )
}
