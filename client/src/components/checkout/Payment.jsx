import { Box, TextField, Typography } from "@mui/material";
import React from "react";

export const Payment = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <Box margin={"30px auto"}>
      <Box>
        <Typography fontSize={"18px"} mb={"1.5rem"}>
          Contact Information
        </Typography>
        <Box className={"flex flex-col gap-4"}>
          <TextField
            fullWidth
            type="text"
            label={"Email"}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            type="text"
            label={"Phone Number"}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            name={"phoneNumber"}
            error={!!touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
