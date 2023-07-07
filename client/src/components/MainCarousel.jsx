import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../theme";
import TestImg1 from "../assets/clothes/1c.jpg";
import { Link } from "react-router-dom";
import { Loading } from "./mui/Loading";

export const MainCarousel = ({ slideProducts, loading }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

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

  return (
    <Carousel
      infiniteLoop={true}
      showArrows={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => {
        return (
          <IconButton
            className=" top-1/2 left-1 text-white p-2"
            sx={{
              zIndex: "20",
              position: "absolute",
              color: shades.primary[100],
              backgroundColor: shades.primary[600],
              "&:hover": {
                backgroundColor: shades.primary[900],
              },
            }}
            onClick={onClickHandler}
          >
            <NavigateBeforeIcon />
          </IconButton>
        );
      }}
      renderArrowNext={(onClickHandler, hasNext, label) => {
        return (
          <IconButton
            className="top-1/2 right-1 text-white p-2"
            sx={{
              zIndex: "20",
              position: "absolute",
              color: shades.primary[100],
              backgroundColor: shades.primary[700],
              "&:hover": {
                backgroundColor: shades.primary[900],
              },
            }}
            onClick={onClickHandler}
          >
            <NavigateNextIcon />
          </IconButton>
        );
      }}
    >
      {slideProducts &&
        slideProducts.map((slide) => {
          return (
            <Box
              key={`${slide?.attributes?.name}_${slide?.id}`}
              className="w-full h-[700px] overflow-hidden relative"
            >
              <Box
                className={" flex flex-col gap-2 rounded p-4"}
                position={"absolute"}
                top={"44%"}
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? undefined : "0"}
                margin={isNonMobile ? undefined : "0 auto"}
                maxWidth={isNonMobile ? undefined : "240px"}
                zIndex={"30"}
                backgroundColor={shades.primary[800]}
                color={shades.primary[100]}
              >
                <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
                <Typography variant="h1" color={shades.primary[100]}>
                  Summer Sale
                </Typography>
                <Link to={`/product/${slide?.id}`}>
                  <Typography
                    fontWeight={"bold"}
                    variant="h4"
                    color={shades.neutral[600]}
                  >
                    Discover More
                  </Typography>
                </Link>
              </Box>

              <img
                className="w-full h-full block object-cover"
                style={{ backgroundAttachment: "fixed" }}
                src={
                  slide?.attributes?.image
                    ? `${import.meta.env.VITE_SERVER_URL}${
                        slide?.attributes?.image?.data?.attributes?.url
                      }`
                    : TestImg1
                }
                alt=""
              />
            </Box>
          );
        })}
    </Carousel>
  );
};
