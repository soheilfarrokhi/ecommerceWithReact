import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { shades } from "../../theme";

export const Loading = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  color: shades.secondary[500],
  justifyContent: "space-between",
  alignItems: "center",
});
