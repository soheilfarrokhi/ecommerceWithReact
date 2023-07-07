import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { shades } from "../theme";

export const Footer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box className=" p-4" backgroundColor="#e4e5e7">
      <Box
        width={"80%"}
        margin={"40px auto"}
        className="flex flex-wrap justify-center items-start gap-4"
        columnGap={"clamp(20px 3px 4px)"}
      >
        <Box
          flex={isNonMobile ? "1 1 40%" : "1 1 100%"}
          // width={"clamp(40%,50%,60%)"}
          className="item flex flex-col gap-3"
        >
          <Typography variant="h4" color={shades.secondary[500]}>
            Ecommerce
          </Typography>
          <Typography>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also
          </Typography>
        </Box>

        <Box
          flex={isNonMobile ? "1 1 10%" : "1 1 100%"}
          className="item flex flex-col gap-3"
        >
          <Typography variant="h6" color={shades.secondary[500]}>
            About Us
          </Typography>
          <Typography>Careers</Typography>
          <Typography>Our Stores</Typography>
          <Typography>Terms & Conditions</Typography>
          <Typography>Privacy & policy</Typography>
        </Box>
        <Box
          flex={isNonMobile ? "1 1 10%" : "1 1 100%"}
          className="item flex flex-col gap-3"
        >
          <Typography variant="h6" color={shades.secondary[500]}>
            Customer Care
          </Typography>
          <Typography>Help Center</Typography>
          <Typography>Track Your Order</Typography>
          <Typography>Corporate & Bulk Purchasing</Typography>
          <Typography>Reurns & Refunds</Typography>
        </Box>
        <Box
          flex={isNonMobile ? "1 1 10%" : "1 1 100%"}
          className="item flex flex-col gap-3"
        >
          <Typography variant="h6" color={shades.secondary[500]}>
            Contact Us
          </Typography>
          <Typography>Fake Address</Typography>
          <Typography>sss.fake@gmail.com</Typography>
          <Typography>33780739376</Typography>
        </Box>
      </Box>
    </Box>
  );
};
