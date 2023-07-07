import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { shades } from "../theme";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
  addToCart,
  setIsCartOpen,
} from "../state/store";
import { FlexBetween } from "./mui/FlexBetween";
import { useNavigate } from "react-router-dom";

export const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { isCartOpen } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item?.attributes?.price;
  }, 0);
  return (
    <Box //overlay
      zIndex={101}
      display={isCartOpen ? "block" : "none"}
      position={"fixed"}
      top={"0"}
      right={"0"}
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      backgroundColor="rgba(0,0,0,0.4)"
    >
      {/* modal  */}
      <Box
        position={"fixed"}
        right={"0"}
        bottom={"0"}
        height={"100%"}
        width={"max(400px,30%)"}
        backgroundColor="#fff"
        className={"flex flex-col gap-4 p-4"}
      >
        {/* header  */}
        <FlexBetween>
          <Typography varient={"h3"}>
            Shopping Badge ({cart?.length})
          </Typography>
          <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
            <CloseIcon />
          </IconButton>
        </FlexBetween>
        {/* products  */}
        {cart &&
          cart.map((item, i) => {
            return (
              <Box key={`${item?.attributes?.name}-${item.id}`}>
                <FlexBetween className="py-2 gap-4 mb-2">
                  <Box
                    className={"rounded"}
                    flex={"1 1 40%"}
                    overflow={"hidden"}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={
                        item?.attributes?.image
                          ? `${import.meta.env.VITE_SERVER_URL}${
                              item?.attributes?.image?.data?.attributes?.url
                            }`
                          : ImgTest
                      }
                      alt={item?.name}
                    />
                  </Box>
                  <Box flex={"1 1 60%"}>
                    <FlexBetween mb={"5px"}>
                      <Typography fontWeight={"bold"}>
                        {item?.attributes?.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBetween>

                    <Typography>
                      {item?.attributes?.shortDescription}
                    </Typography>

                    <FlexBetween m="15px 0">
                      <Box
                        className={"flex items-center border"}
                        borderColor={shades.neutral[500]}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCart({ id: item.id }))
                          }
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography>{item.count} </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCart({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* price  */}
                      <Typography fontWeight={"bold"}>
                        ${item?.attributes?.price}
                      </Typography>
                    </FlexBetween>
                  </Box>
                </FlexBetween>
                <Divider />
              </Box>
            );
          })}
        {/* Actions  */}
        <Box className="my-2">
          <FlexBetween>
            <Typography fontWeight={"bold"}>Subtotal</Typography>
            <Typography fontWeight={"bold"}>${totalPrice}</Typography>
          </FlexBetween>
          <Button
            className="rounded-none w-full py-2 px-4"
            sx={{
              backgroundColor: shades.primary[900],
              color: "#fff",
              margin: "20px 0",
              "&: hover": {
                backgroundColor: shades.primary[800],
              },
            }}
            onClick={() => {
              navigate("/checkout");
              dispatch(setIsCartOpen({}));
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
