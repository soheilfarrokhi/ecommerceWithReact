import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ImgTest from "../assets/clothes/1c.jpg";
import { shades } from "../theme";
import { addToCart } from "../state/store";
import { Link, useNavigate } from "react-router-dom";

export const ProductItem = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  console.log(item);

  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item?.attributes;

  return (
    <Box width={width} className={"flex flex-col gap-1"}>
      <Box
        className="img w-full h-[300px] rounded cursor-pointer"
        position={"relative"}
        overflow={"hidden"}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* overlay  */}
        <Box
          display={isHovered ? "flex" : "none"}
          position={"absolute"}
          className={"flex-col w-full h-full p-4 "}
          backgroundColor={shades.primary[800]}
        >
          <Box className="flex justify-between items-center w-full h-full">
            <IconButton
              sx={{
                backgroundColor: shades.primary[900],
                color: "white",
                "&:hover": {
                  backgroundColor: shades.primary[100],
                  color: "black",
                },
              }}
              onClick={() => setCount(Math.max(count - 1, 1))}
            >
              <RemoveIcon />
            </IconButton>
            <Typography color={shades.primary[100]}>{count} </Typography>
            <IconButton
              sx={{
                backgroundColor: shades.primary[900],
                color: "white",
                "&:hover": {
                  backgroundColor: shades.primary[100],
                  color: "black",
                },
              }}
              onClick={() => setCount(count + 1)}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            sx={{
              backgroundColor: shades.primary[900],
              color: "white",
              "&:hover": {
                backgroundColor: shades.primary[100],
                color: "black",
              },
            }}
            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
          >
            Add to Cart
          </Button>
        </Box>
        <img
          src={
            item?.attributes?.image
              ? `${import.meta.env.VITE_SERVER_URL}${
                  item?.attributes?.image?.data?.attributes?.url
                }`
              : ImgTest
          }
          alt={name}
          className="w-full h-full block object-cover"
          onClick={() => navigate(`/product/${item.id}`)}
        />
      </Box>
      <Link className="cursor-pointer" to={`/product/${item.id}`}>
        <Box className={"flex flex-col gap-1"} mt={"3px"}>
          <Typography variant="subtitle2" color={shades.primary[800]}>
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight={"bold"}>${price}</Typography>
        </Box>
      </Link>
    </Box>
  );
};
