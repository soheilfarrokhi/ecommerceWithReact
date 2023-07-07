import React from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { AddressForm } from "./AddressForm";

export const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <Box margin={"30px auto"}>
      <Box>
        <Typography fontSize={"18px"} mb={"1.5rem"}>
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>
      <Box mb={"20px"}>
        <FormControlLabel
          label="same for shipping address"
          control={
            <Checkbox
              defaultChecked
              value={values?.shippingAddress?.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </Box>
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography fontSize={"18px"} mb={"1.5rem"}>
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};
