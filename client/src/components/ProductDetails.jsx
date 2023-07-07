import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tab,
  Tabs,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../state/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { shades } from "../theme";
import { ProductItem } from "./ProductItem";
import { FlexBetween } from "../components/mui/FlexBetween";
import { useHomeContext } from "../context/HomeProvider";
import { Loading } from "./mui/Loading";

export const ProductDetails = () => {
  const { getProduct, getProducts, loading } = useHomeContext();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    getProduct(id, setItem);
    getProducts(setItems);
  }, [id]);

  console.log(id);
  console.log(items);

  if (loading) {
    return (
      <Box className="w-full h-[700px] overflow-hidden relative">
        <Loading>
          <Typography className="w-full" textAlign={"center"} variant="h1">
            Loading ...
          </Typography>
        </Loading>
      </Box>
    );
  }

  console.log(value);

  return (
    <Box
      width={"80%"}
      margin={"80px auto"}
      className="h-full flex flex-wrap gap-8"
    >
      <Box
        flex={isNonMobile ? "1 1 40%" : "1 1 100%"}
        className={"rounded-md overflow-hidden h-[700px]"}
      >
        <img
          className="w-full h-full object-cover"
          src={`${import.meta.env.VITE_SERVER_URL}${
            item?.attributes?.image?.data?.attributes?.url
          }`}
          alt={item?.attributes?.name}
        />
      </Box>
      <Box flex={isNonMobile ? "1 1 50%" : "1 1 100%"}>
        <FlexBetween className="mb-20" width={"100%"}>
          <IconButton onClick={() => navigate(`/`)}>
            <Typography sx={{ cursor: "pointer" }}>Home</Typography>
          </IconButton>
          <FlexBetween gap={"4rem"}>
            <IconButton
              sx={{ fontSize: "0.75rem" }}
              onClick={() =>
                navigate(`/product/${Math.max(Number(id) - 1, 1)}`)
              }
            >
              Prev
            </IconButton>
            <IconButton
              sx={{ fontSize: "0.75rem" }}
              onClick={() =>
                navigate(`/product/${Math.min(Number(id) + 1, items?.length)}`)
              }
            >
              Next
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <Box className="flex flex-col gap-4">
          <Box>
            <Typography variant="h4" color={shades.secondary[500]}>
              {item?.attributes?.name}
            </Typography>
            <Typography> ${item?.attributes?.price}</Typography>
          </Box>
          <Box>
            <Typography mt={"40px"}>
              {item?.attributes?.shortDescription}
            </Typography>
          </Box>
          <FlexBetween className="gap-4">
            <Box
              display={"flex"}
              minWidth={"120px"}
              className="justify-between items-center gap-2 border"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.primary[900],
                color: "white",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: shades.primary[800],
                  color: "white",
                },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add to Cart
            </Button>
          </FlexBetween>
          <Box>
            <Box className="flex gap-2 mt-4 mb-2">
              <FavoriteBorderOutlinedIcon />
              <Typography>add to wishlist</Typography>
            </Box>
            <Box className="flex gap-2">
              <Typography>Categories :</Typography>
              <Typography>{item?.attributes?.category}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="mt-20px w-full">
        <Tabs
          textColor={shades.primary[500]}
          indicatorColor={"secondary"}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Description" value={"description"} />
          <Tab label="Reviews" value={"reviews"} />
        </Tabs>
      </Box>
      <Box className="mt-4 w-full min-h-[100px]">
        {value === "description" && (
          <Typography>{item?.attributes?.longDescription}</Typography>
        )}
        {value === "reviews" && <Typography>Reviews</Typography>}
      </Box>
      <Box className="mt-4 w-full">
        <Typography variant="h4" fontWeight={"bold"}>
          Related Products
        </Typography>
        <Box className="mt-8 w-full flex flex-wrap gap-4">
          {items.slice(0, 4).map((itm) => (
            <ProductItem
              key={`${itm?.attributes?.name}_${itm.id}`}
              item={itm}
              width={isNonMobile ? "20%" : "100%"}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
