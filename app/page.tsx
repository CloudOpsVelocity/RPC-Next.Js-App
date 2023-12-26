import HomeSearch from "./components/molecules/home-search"
import style from "./styles/home.module.css"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {

  return (
 <div className="h-screen">
  <HomeSearch/>
 </div>
  )
}
