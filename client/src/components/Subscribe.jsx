import { useState } from "react";
import {
  Box,
  InputBase,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { shades } from "../theme";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export const Subscribe = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = useState();
  return (
    <Box
      width={isNonMobile ? "80%" : "100%"}
      margin={"0 auto"}
      textAlign={"center"}
      className="flex flex-col gap-1 p-4"
    >
      <IconButton
        sx={{
          width: "fit-centent",
          textAlign: "center",
          ":hover": {
            cursor: "text",
          },
        }}
      >
        <MailOutlineIcon
          sx={{ color: shades.secondary[500] }}
          fontSize="large"
        />
      </IconButton>
      <Typography variant="h3" color={shades.secondary[500]}>
        Subscribe to my news letter!
      </Typography>
      <Box
        className="justify-between items-center py-2 px-4 rounded-md"
        margin={"15px auto"}
        width={isNonMobile ? "60%" : "100%"}
        display={"flex"}
        gap={"2rem"}
        backgroundColor={"#e4e5e7"}
      >
        <InputBase
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Divider
          sx={{ height: "28px", margin: "2px 0px" }}
          orientation="vertical"
        />
        <Typography
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          className="py-2 px-4 rounded"
        >
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};
