import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../theme";
import { useSelector } from "react-redux";
import { Shipping } from "../components/checkout/Shipping";
import { Payment } from "../components/checkout/Payment";
import { FlexBetween } from "../components/mui/FlexBetween";
import { loadStripe } from "@stripe/stripe-js";
import { createdAxios } from "../createAxios/craatedAxios";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_TOKEN}`);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    // copies of billing address to shippingAddress
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({});
  };
  const makePayment = async (values) => {
    try {
      const stripe = await stripePromise;
      const requestBody = {
        userName: [values.firstName, values.lastName].join(" "),
        email: values.email,
        products: cart.map(({ id, count }) => ({
          id,
          count,
        })),
      };

      const session = await createdAxios.post(`api/orders`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (session) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box width={"80%"} margin={"80px auto"}>
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                {isFirstStep && (
                  <Shipping
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                  />
                )}
                {isSecondStep && (
                  <Payment
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                  />
                )}
                <FlexBetween width={"100%"} gap={"50px"}>
                  {isSecondStep && (
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      sx={{
                        backgroundColor: shades.primary[900],
                        color: shades.primary[100],
                      }}
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.secondary[500],
                      color: shades.primary[100],
                    }}
                    // onClick={() => setActiveStep(activeStep + 1)}
                  >
                    {isFirstStep ? "Next" : "place Order"}
                  </Button>
                </FlexBetween>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
