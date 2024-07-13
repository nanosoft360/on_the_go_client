"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box, CircularProgress } from "@mui/material";
import { CreateDepositRequestFormValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { CreateDepositRequestSchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
import {
  createDepositReq,
  getAllDepositReq,
} from "../../../lib/features/deposit/depositSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { uploadSlipImg } from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const bankNames = [
  { label: "AB Bank Limited" },
  { label: "Agrani Bank Limited" },
  { label: "Al-Arafah Islami Bank Limited" },
  { label: "Bangladesh Commerce Bank Limited" },
  { label: "Bangladesh Development Bank Limited" },
  { label: "Bank Asia Limited" },
  { label: "BASIC Bank Limited" },
  { label: "BRAC Bank Limited" },
  { label: "Citibank N.A." },
  { label: "Commercial Bank of Ceylon PLC" },
  { label: "Community Bank Bangladesh Limited" },
  { label: "Dhaka Bank Limited" },
];

const modeOfDepo = [
  { label: "Cash" },
  { label: "Bank Transfer" },
  { label: "Cheque & DD" },
];

// for upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  //   width: 1,
});

export default function Deposit_request_from() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const imgState = useSelector((state: RootState) => state?.upload?.uploadSlip);
  // for loading define
  const loading = useSelector((state: RootState) => state?.deposit?.loading);

  let img = "";
  if (imgState && imgState?.length > 0) {
    img = imgState[0]?.url;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromLocalStorage = JSON.parse(
        localStorage?.getItem("userId")
      );
      setUserId(userIdFromLocalStorage);
    }

    // dispatch(getAllDepositReq())
  }, []);

  console.log("pagla", userId);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadSlipImg(selectedFile));
    }
  };

  const initialValues: CreateDepositRequestFormValues = {
    userId: userId,
    dpType: "",
    date: "",
    amount: 0,
    bankName: "",
  };

  const handleSubmit = async (
    values: CreateDepositRequestFormValues,
    { setSubmitting }
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = key === "amount" ? Number(values[key]) : values[key];
      formData.append(key, value.toString());
    });

    if (img) formData.append("slipImage", img);

    try {
      // Log formData to check if amount is correctly converted

      const response = await dispatch(createDepositReq(formData)).unwrap();

      // Handle successful response
    } catch (error) {
      console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateDepositRequestSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, touched, errors, setFieldValue, values }) => (
        <Form className=" w-6/12">
          <Box className="border grid grid-cols-1 gap-4 p-4">
            <Field name="dpType">
              {({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={modeOfDepo.map((option) => option.label)}
                  onChange={(event, value) => setFieldValue(field.name, value)}
                  value={values.dpType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mode of Deposit"
                      error={touched.dpType && !!errors.dpType}
                      helperText={touched.dpType && errors.dpType}
                    />
                  )}
                />
              )}
            </Field>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <Field name="date">
                  {({ field, form }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      sx={{ width: "100%" }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) =>
                        form.setFieldValue(
                          field.name,
                          date ? date.format("YYYY-MM-DD") : ""
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                        />
                      )}
                    />
                  )}
                </Field>
              </DemoContainer>
            </LocalizationProvider>

            <Field name="amount">
              {({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                />
              )}
            </Field>
            <Field name="bankName">
              {({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={bankNames.map((option) => option.label)}
                  onChange={(event, value) => setFieldValue(field.name, value)}
                  value={values.bankName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Bank"
                      error={touched.bankName && !!errors.bankName}
                      helperText={touched.bankName && errors.bankName}
                    />
                  )}
                />
              )}
            </Field>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="info"
              tabIndex={-1}
              startIcon={<Icon icon="ep:upload-filled" />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
