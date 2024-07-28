"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form, Formik, Field, useField, ErrorMessage } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box, CircularProgress } from "@mui/material";
import { CreateVisaApplyFormValues } from "../../../types/formTypes";
import { CreateVisaApplySchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
import { createVisaApply } from "../../../lib/features/visaApply/visaApplySlice";
import { useDispatch } from "react-redux";
import {
  uploadDocImage,
  uploadDocImageIf,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const gender = [
  { label: "Male" },
  { label: "Female" },
  { label: "Others" },
  // { label: "Non-binary" },
  // { label: "Genderqueer" },
  // { label: "Genderfluid" },
  // { label: "Agender" },
  // { label: "Bigender" },
  // { label: "Demiboy" },
  // { label: "Demigirl" },
  // { label: "Two-Spirit" },
  // { label: "Pangender" },
  // { label: "Androgynous" },
  // { label: "Intersex" },
  // { label: "Transgender" },
  // { label: "Transmasculine" },
  // { label: "Transfeminine" },
  // { label: "Cisgender" },
  // { label: "Neutrois" },
  // { label: "Polygender" },
  // { label: "Third Gender" },
  // { label: "Questioning" },
];
const nationality = [{ label: "Bangladeshi" }, { label: "Others" }];
const whichCountry = [
  { label: "AFGHAN" },
  { label: "ALBANIAN" },
  { label: "ALGERIAN" },
  { label: "AMERICAN" },
  { label: "ANDORRAN" },
  { label: "ANGOLAN" },
  { label: "ANTIGUANS" },
  { label: "ARGENTINEAN" },
  { label: "ARMENIAN" },
  { label: "AUSTRALIAN" },
  { label: "AUSTRIAN" },
  { label: "AZERBAIJANI" },
  { label: "BAHAMIAN" },
  { label: "BAHRAINI" },
  { label: "BANGLADESHI" },
  { label: "BARBADIAN" },
  { label: "BARBUDANS" },
  { label: "BATSWANA" },
  { label: "BELARUSIAN" },
  { label: "BELGIAN" },
  { label: "BELIZEAN" },
  { label: "BENINESE" },
  { label: "BHUTANESE" },
  { label: "BOLIVIAN" },
  { label: "BOSNIAN" },
  { label: "BRAZILIAN" },
  { label: "BRITISH" },
  { label: "BRUNEIAN" },
  { label: "BULGARIAN" },
  { label: "BURKINABE" },
  { label: "BURMESE" },
  { label: "BURUNDIAN" },
  { label: "CABO VERDEAN" },
  { label: "CAMBODIAN" },
  { label: "CAMEROONIAN" },
  { label: "CANADIAN" },
  { label: "CENTRAL AFRICAN" },
  { label: "CHADIAN" },
  { label: "CHILEAN" },
  { label: "CHINESE" },
  { label: "COLOMBIAN" },
  { label: "COMORAN" },
  { label: "CONGOLESE" },
  { label: "COSTA RICAN" },
  { label: "CROATIAN" },
  { label: "CUBAN" },
  { label: "CYPRIOT" },
  { label: "CZECH" },
  { label: "DANISH" },
  { label: "DJIBOUTI" },
  { label: "DOMINICAN" },
  { label: "DUTCH" },
  { label: "EAST TIMORESE" },
  { label: "ECUADOREAN" },
  { label: "EGYPTIAN" },
  { label: "EMIRIAN" },
  { label: "EQUATORIAL GUINEAN" },
  { label: "ERITREAN" },
  { label: "ESTONIAN" },
  { label: "ETHIOPIAN" },
  { label: "FIJIAN" },
  { label: "FILIPINO" },
  { label: "FINNISH" },
  { label: "FRENCH" },
  { label: "GABONESE" },
  { label: "GAMBIAN" },
  { label: "GEORGIAN" },
  { label: "GERMAN" },
  { label: "GHANAIAN" },
  { label: "GREEK" },
  { label: "GRENADIAN" },
  { label: "GUATEMALAN" },
  { label: "GUINEA-BISSAUAN" },
  { label: "GUINEAN" },
  { label: "GUYANESE" },
  { label: "HAITIAN" },
  { label: "HERZEGOVINIAN" },
  { label: "HONDURAN" },
  { label: "HUNGARIAN" },
  { label: "I-KIRIBATI" },
  { label: "ICELANDER" },
  { label: "INDIAN" },
  { label: "INDONESIAN" },
  { label: "IRANIAN" },
  { label: "IRAQI" },
  { label: "IRISH" },
  { label: "ISRAELI" },
  { label: "ITALIAN" },
  { label: "IVORIAN" },
  { label: "JAMAICAN" },
  { label: "JAPANESE" },
  { label: "JORDANIAN" },
  { label: "KAZAKHSTANI" },
  { label: "KENYAN" },
  { label: "KITTIAN AND NEVISIAN" },
  { label: "KUWAITI" },
  { label: "KYRGYZ" },
  { label: "LAOTIAN" },
  { label: "LATVIAN" },
  { label: "LEBANESE" },
  { label: "LIBERIAN" },
  { label: "LIBYAN" },
  { label: "LIECHTENSTEINER" },
  { label: "LITHUANIAN" },
  { label: "LUXEMBOURGER" },
  { label: "MACEDONIAN" },
  { label: "MADAGASY" },
  { label: "MALAWIAN" },
  { label: "MALAYSIAN" },
  { label: "MALDIVIAN" },
  { label: "MALIAN" },
  { label: "MALTESE" },
  { label: "MARSHALLESE" },
  { label: "MAURITANIAN" },
  { label: "MAURITIAN" },
  { label: "MEXICAN" },
  { label: "MICRONESIAN" },
  { label: "MOLDOVAN" },
  { label: "MONACAN" },
  { label: "MONGOLIAN" },
  { label: "MOROCCAN" },
  { label: "MOSOTHO" },
  { label: "MOTSWANA" },
  { label: "MOZAMBICAN" },
  { label: "NAMIBIAN" },
  { label: "NAURUAN" },
  { label: "NEPALESE" },
  { label: "NEW ZEALANDER" },
  { label: "NI-VANUATU" },
  { label: "NICARAGUAN" },
  { label: "NIGERIEN" },
  { label: "NORTH KOREAN" },
  { label: "NORTHERN IRISH" },
  { label: "NORWEGIAN" },
  { label: "OMANI" },
  { label: "PAKISTANI" },
  { label: "PALAUAN" },
  { label: "PANAMANIAN" },
  { label: "PAPUA NEW GUINEAN" },
  { label: "PARAGUAYAN" },
  { label: "PERUVIAN" },
  { label: "POLISH" },
  { label: "PORTUGUESE" },
  { label: "QATARI" },
  { label: "ROMANIAN" },
  { label: "RUSSIAN" },
  { label: "RWANDAN" },
  { label: "SAINT LUCIAN" },
  { label: "SALVADORAN" },
  { label: "SAMOAN" },
  { label: "SAN MARINESE" },
  { label: "SAO TOMEAN" },
  { label: "SAUDI" },
  { label: "SCOTTISH" },
  { label: "SENEGALESE" },
  { label: "SERBIAN" },
  { label: "SEYCHELLOIS" },
  { label: "SIERRA LEONEAN" },
  { label: "SINGAPOREAN" },
  { label: "SLOVAKIAN" },
  { label: "SLOVENIAN" },
  { label: "SOLOMON ISLANDER" },
  { label: "SOMALI" },
  { label: "SOUTH AFRICAN" },
  { label: "SOUTH KOREAN" },
  { label: "SPANISH" },
  { label: "SRI LANKAN" },
  { label: "SUDANESE" },
  { label: "SURINAMER" },
  { label: "SWAZI" },
  { label: "SWEDISH" },
  { label: "SWISS" },
  { label: "SYRIAN" },
  { label: "TAIWANESE" },
  { label: "TAJIK" },
  { label: "TANZANIAN" },
  { label: "THAI" },
  { label: "TOGOLESE" },
  { label: "TONGAN" },
  { label: "TRINIDADIAN OR TOBAGONIAN" },
  { label: "TUNISIAN" },
  { label: "TURKISH" },
  { label: "TUVALUAN" },
  { label: "UGANDAN" },
  { label: "UKRAINIAN" },
  { label: "URUGUAYAN" },
  { label: "UZBEKISTANI" },
  { label: "VENEZUELAN" },
  { label: "VIETNAMESE" },
  { label: "WELSH" },
  { label: "YEMENITE" },
  { label: "ZAMBIAN" },
  { label: "ZIMBABWEAN" },
];

const religion = [
  { label: "Islam" },
  { label: "Hinduism" },
  { label: "Christianity" },
  { label: "Buddhism" },
  // { label: "Sikhism" },
  // { label: "Judaism" },
  // { label: "Bahá'í" },
  // { label: "Jainism" },
  // { label: "Shinto" },
  // { label: "Taoism" },
  // { label: "Zoroastrianism" },
  // { label: "Confucianism" },
  // { label: "Rastafarianism" },
  // { label: "Paganism" },
  // { label: "Animism" },
  // { label: "New Age" },
  // { label: "Unitarian Universalism" },
  // { label: "Tenrikyo" },
  // { label: "Druze" },
  // { label: "Cao Dai" },
  // { label: "Falun Gong" },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
});

export default function Visa_Apply_Form() {

  const [imgPass, setImgPass] = useState(null)
  const [imgPassDoc, setImgPassDoc] = useState(null)
  // const [imgImage, setImgImage] = useState(null)
  // file information
  const [fileInfo, setFileInfo] = useState(null);
  const [fileInfo1, setFileInfo1] = useState(null);
  const [fileInfo2, setFileInfo2] = useState(null);
  const [fileInfo3, setFileInfo3] = useState(null);

  const [filePass, setFilePass] = useState(null);
  const [filePassDoc, setFilePassDoc] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);
  // for button loading
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingBtn1, setLoadingBtn1] = useState(false);
  const [loadingBtn2, setLoadingBtn2] = useState(false);
  const [loadingBtn3, setLoadingBtn3] = useState(false);

  const [userId, setUserId] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromLocalStorage = JSON.parse(
        localStorage?.getItem("userId")
      );
      setUserId(userIdFromLocalStorage);
    }

    // loading
    // Simulate a loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading period

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // loading function
  // useEffect(() => {}, []);

  const imgPassState = useSelector(
    (state: RootState) => state?.upload?.uploadPass
  );
  const imgDocState = useSelector(
    (state: RootState) => state?.upload?.uploadDoc
  );
  const imgState = useSelector((state: RootState) => state?.upload?.uploadImg);
  const previousPassState = useSelector((state: RootState) => state?.upload?.uploadImgIf);

<<<<<<< HEAD
  // let imgPass = {};
  // let imgDoc = {};
  let img = {};
  // if (imgPassState && imgPassState.length > 0) {
  //   imgPass = { id: imgPassState[0]?.public_id, url: imgPassState[0].url };
  // }
  // if (imgDocState && imgDocState.length > 0) {
  //   imgDoc = { id: imgDocState[0]?.public_id, url: imgDocState[0].url };
  // }
=======
  let imgPass = "";
  let imgDoc = "";
  let img = "";
  let previousPass = "";
  if (imgPassState && imgPassState.length > 0) {
    imgPass = imgPassState[0].url;
  }
  if (imgDocState && imgDocState.length > 0) {
    imgDoc = imgDocState[0].url;
  }
>>>>>>> 9c08843cf901dc442626d77174a9d50c9b644f92
  if (imgState && imgState.length > 0) {
    img = { id: imgState[0]?.public_id, url: imgState[0].url };
  }
  if (previousPassState && previousPassState.length > 0) {
    previousPass = previousPassState[0].url;
  }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     dispatch(uploadPassImage(selectedFile));
  //   }

  //   // file information
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileInfo({
  //       name: file.name,
  //       size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
  //     });
  //   }
  // };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLoadingBtn(true); // Set loading to true before the API call
      setImgPass(selectedFile)
      // await dispatch(uploadPassImage(selectedFile));
      setLoadingBtn(false); // Set loading to false after the API call
    }

    // File information
    const file = event.target.files[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };

  const handleFileChange1 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn1(true);
      await dispatch(uploadImg(selectedFile));
      setLoadingBtn1(false);
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo1({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn2(true);
      setImgPassDoc(selectedFile)
      // await dispatch(uploadDocImage(selectedFile));
      setLoadingBtn2(false);
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo2({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange3 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
<<<<<<< HEAD
      setLoadingBtn3(true);
      // await dispatch(uploadDocImage(selectedFile));
      setLoadingBtn3(false);
=======
     setLoadingBtn3(true);
      await dispatch(uploadDocImageIf(selectedFile));
     setLoadingBtn3(false);
>>>>>>> 9c08843cf901dc442626d77174a9d50c9b644f92
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo3({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };

  const initialValues: CreateVisaApplyFormValues = {
    userId: userId,
    givenName: "",
    surName: "",
    gender: "",
    nationality: "",
    passportNo: "",
    passExpiryDate: "",
    dob: "",
    religion: "",
    applyForCountry: "",
  };

  const handleSubmit = async (
    values: CreateVisaApplyFormValues,
    { setSubmitting }
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

<<<<<<< HEAD
    // if (imgPass) formData.append("passportPdf", imgPass);
    // if (imgDoc) formData.append("otherDocumentPdf", imgDoc);
    // if (img) formData.append("image", img);

    if (imgPass) {
      formData.append("passportPdf", imgPass);
      console.log("ulluk", imgPass);
      
    }

    // Assuming you need to append imgDoc and img similarly
    if (imgPassDoc) {
      formData.append("documentPdf", imgPassDoc);
    }

    if (img) {
      formData.append("image", JSON.stringify(img));
    }
=======
    if (imgPass) formData.append("passportPdf", imgPass);
    if (imgDoc) formData.append("otherDocumentPdf", imgDoc);
    if (img) formData.append("image", img);
    if (previousPass) formData.append("previousPassPdf", previousPass);
>>>>>>> 9c08843cf901dc442626d77174a9d50c9b644f92

    try {
      const response = await dispatch(createVisaApply(formData)).unwrap();
      console.log("pagla", response);
      console.log("Mlluk", formData);

      if (response?.status === 200) {
        toast.success("Your visa applycation created successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.href = "/dashbord/visa-application-list";
        }, 3000);
        // success
        // window.location.reload();
        // window.location.replace("/main")
        // window.location.assign("/main")
        // window.location.reload(true)
        // window.location.href = "http://localhost:3000/main"
        // window.location.replace("http://localhost:3000/main")
        // window.location.assign("http://localhost:3000/main")
        // window.location.reload(true)
        // window.location.href = "/main"
        // window.location.replace("/main")
        // window.location.assign("/main")
        // window.location.reload(true)
        // window.location.href = "http://localhost:3000/main"
        // window.location.replace("http://localhost:3000/main")
        // window.history.push("/main")

        // tostify
      }

      // Handle successful response
    } catch (error) {
      toast.error("Something Worng, please try again", {
        position: "top-center",
      });
      console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
  };

  console.log("rajakar", imgPass);
  
  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div className="border p-3">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateVisaApplySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-2 gap-2 ">
              <Field name="givenName">
                {({ field, form }) => (
                  <TextField
                    required
                    {...field}
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    error={touched.givenName && !!errors.givenName}
                    helperText={touched.givenName && errors.givenName}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
                  />
                )}
              </Field>
              <Field name="surName">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Father Name"
                    variant="outlined"
                    type="text"
                    error={touched.surName && !!errors.surName}
                    helperText={touched.surName && errors.surName}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
                  />
                )}
              </Field>
              <Field name="gender">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gender.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...field}
                        {...params}
                        label="Select Gender"
                        error={touched.gender && !!errors.gender}
                        helperText={touched.gender && errors.gender}
                      />
                    )}
                  />
                )}
              </Field>
              <Field name="nationality">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={nationality.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...field}
                        {...params}
                        label="Select Nationality"
                        error={touched.nationality && !!errors.nationality}
                        helperText={touched.nationality && errors.nationality}
                      />
                    )}
                  />
                )}
              </Field>
              <Field name="applyForCountry">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={whichCountry.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...field}
                        {...params}
                        label="Which country for visa"
                        error={
                          touched.applyForCountry && !!errors.applyForCountry
                        }
                        helperText={
                          touched.applyForCountry && errors.applyForCountry
                        }
                      />
                    )}
                  />
                )}
              </Field>

              <Field name="passportNo">
                {({ field, form }) => (
                  <TextField
                    required
                    {...field}
                    id="outlined-basic"
                    label="Passport Number"
                    variant="outlined"
                    type="text"
                    error={touched.passportNo && !!errors.passportNo}
                    helperText={touched.passportNo && errors.passportNo}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
                  />
                )}
              </Field>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="passExpiryDate">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        label="Passport Expiry Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue(
                            field.name,
                            date ? date.format("YYYY-MM-DD") : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            error={
                              touched.passExpiryDate && !!errors.passExpiryDate
                            }
                            helperText={
                              touched.passExpiryDate && errors.passExpiryDate
                            }
                          />
                        )}
                      />
                    )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="dob">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        label="Date Of Birth"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue(
                            field.name,
                            date ? date.format("YYYY-MM-DD") : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            error={touched.dob && !!errors.dob}
                            helperText={touched.dob && errors.dob}
                          />
                        )}
                      />
                    )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider>

              <Field name="religion">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={religion.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        {...field}
                        label="Select Religion"
                        error={touched.religion && !!errors.religion}
                        helperText={touched.religion && errors.religion}
                      />
                    )}
                  />
                )}
              </Field>

              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={
                    loadingBtn ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Passport</>
                  )}

                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileInfo && (
                  <div>
                    <p>File Name: {fileInfo.name}</p>
                    <p>File Size: {fileInfo.size} KB</p>
                  </div>
                )}
              </div>

              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={
                    loadingBtn1 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn1 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Photo</>
                  )}

                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange1}
                  />
                </Button>
                {fileInfo1 && (
                  <div>
                    <p>File Name: {fileInfo1.name}</p>
                    <p>File Size: {fileInfo1.size} KB</p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  // startIcon={<Icon icon="ep:upload-filled" />}
                  startIcon={
                    loadingBtn2 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn2 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Previous Visa (If Any)</>
                  )}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange2}
                  />
                </Button>
                {fileInfo2 && (
                  <div>
                    <p>File Name: {fileInfo2.name}</p>
                    <p>File Size: {fileInfo2.size} KB</p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={
                    loadingBtn3 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn3 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Others Documents (If Any)</>
                  )}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange3}
                  />
                </Button>
                {fileInfo3 && (
                  <div>
                    <p>File Name: {fileInfo3.name}</p>
                    <p>File Size: {fileInfo3.size} KB</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{
                  width: "150px",
                  height: "50px",
                  fontSize: "17px",
                  marginTop: "6px",
                }}
                // size="large"
              >
                Apply
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
