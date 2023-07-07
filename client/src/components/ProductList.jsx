import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Tabs, Tab, useMediaQuery } from "@mui/material";
import { ProductItem } from "./ProductItem";
import { setProducts } from "../state/store";
import { createdAxios } from "../createAxios/craatedAxios";
import { useHomeContext } from "../context/HomeProvider";
import { shades } from "../theme";

export const ProductList = ({ products }) => {
  const [value, setValue] = useState("all");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (e, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  console.log(products);

  // categories
  const newCollection = products.filter(
    (item) => item?.attributes?.category === "newCollection"
  );
  const bestSellers = products.filter(
    (item) => item?.attributes?.category === "bestSellers"
  );
  const topRated = products.filter(
    (item) => item?.attributes?.category === "topRated"
  );
  const suggestion = products.filter(
    (item) => item?.attributes?.category === "suggestion"
  );

  return (
    <Box
      width={isNonMobile ? "80%" : "100%"}
      margin={"80px auto"}
      className="p-4 "
    >
      <Typography variant="h3" textAlign={"center"}>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor={shades.primary[700]}
        indicatorColor={"secondary"}
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          textTransform: "capitalize",
          cursor: "pointer",
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="All" value={"all"} />
        <Tab label="new-collection" value={"newCollection"} />
        <Tab label="best-sellers" value={"bestSellers"} />
        <Tab label="top-rated" value={"topRated"} />
        <Tab label="suggestion" value={"suggestion"} />
      </Tabs>
      <Box
        margin={"0 auto"}
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fill,minmax(300px,4fr))"}
        className="gap-4 mt-20 bg-white"
      >
        {value === "all" &&
          products.map((item) => {
            return (
              <ProductItem
                key={`${item?.attributes?.name}_${item.id}`}
                item={item}
                width={"100%"}
              />
            );
          })}
        {value === "newCollection" &&
          newCollection.map((item) => {
            return (
              <ProductItem
                key={`${item?.attributes?.name}_${item.id}`}
                item={item}
                width={"100%"}
              />
            );
          })}
        {value === "bestSellers" &&
          bestSellers.map((item) => {
            return (
              <ProductItem
                key={`${item?.attributes?.name}_${item.id}`}
                item={item}
                width={"100%"}
              />
            );
          })}
        {value === "topRated" &&
          topRated.map((item) => {
            return (
              <ProductItem
                key={`${item?.attributes?.name}_${item.id}`}
                item={item}
                width={"100%"}
              />
            );
          })}
        {value === "suggestion" &&
          suggestion.map((item) => {
            return (
              <ProductItem
                key={`${item?.attributes?.name}_${item.id}`}
                item={item}
                width={"100%"}
              />
            );
          })}
      </Box>
    </Box>
  );
};
