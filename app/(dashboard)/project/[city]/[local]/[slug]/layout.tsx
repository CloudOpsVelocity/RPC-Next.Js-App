import Footer from "@/app/components/layouts/primary/footer";
import Header from "@/app/components/layouts/primary/header";
import ProjectDrawer from "@/app/components/project/Drawer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
