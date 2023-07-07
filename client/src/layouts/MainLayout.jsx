import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { CartMenu } from "../components/CartMenu";

export const MainLayout = () => {
  return (
    <>
      <CartMenu />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
