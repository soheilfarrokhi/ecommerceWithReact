import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./views/Home";
import { MainLayout } from "./layouts/MainLayout";
import { ProductSingle } from "./views/ProductSingle";
import { Checkout } from "./views/Checkout";
import { Success } from "./views/Success";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const Allroutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={"/"} element={<MainLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/checkout/success"} element={<Success />} />

          <Route path={"/product/:id"} element={<ProductSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
