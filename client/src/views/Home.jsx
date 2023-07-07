import React, { useEffect } from "react";
import { ProductList } from "../components/ProductList";
import { MainCarousel } from "../components/MainCarousel";
import { useHomeContext } from "../context/HomeProvider";
import { useSelector } from "react-redux";
import { Subscribe } from "../components/Subscribe";

export const Home = () => {
  // context
  const { getProducts, loading } = useHomeContext();
  const { products } = useSelector((state) => state.cart);
  useEffect(() => {
    getProducts();
  }, []);

  const slideProducts = products && products.slice(0, 4);

  return (
    <div className="home w-full bg-white">
      {/* main carousel  */}
      <MainCarousel slideProducts={slideProducts} loading={loading} />
      {/* product list  */}
      <ProductList products={products} />
      {/* subscribe  */}
      <Subscribe />
    </div>
  );
};
