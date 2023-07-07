import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { Box, Badge, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../state/store";

export const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const goHome = () => {
    navigate("/");
  };
  return (
    <Box
      position={"fixed"}
      zIndex={"100"}
      top={"0"}
      left={"0"}
      bgcolor={"#fff"}
      className="flex justify-between items-center w-full h-[70px] gap-4 p-4"
    >
      {/* logo  */}
      <Typography
        variant="h4"
        fontWeight={"bold"}
        className="logo"
        color={shades.secondary[500]}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={goHome}
      >
        FaEcommerce
      </Typography>
      {/* content  */}
      <Box className="icons flex items-center gap-2">
        <IconButton className="search" sx={{ color: "black" }}>
          <SearchIcon />
        </IconButton>
        <IconButton className="profile" sx={{ color: "black" }}>
          <PermIdentityIcon />
        </IconButton>
        <Badge
          color="secondary"
          sx={{
            "& .MuiBadge-badge": {
              // backgroundColor: shades.secondary[500],
              top: 5,
              right: 5,
              padding: "0 4px",
              minWidth: "13px",
              height: "14px",
            },
          }}
          badgeContent={cart && cart.length}
          invisible={cart.length === 0}
        >
          <IconButton
            className="calendar"
            sx={{ color: "black" }}
            onClick={() => dispatch(setIsCartOpen({}))}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Badge>
        <IconButton className="menu" sx={{ color: "black" }}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
