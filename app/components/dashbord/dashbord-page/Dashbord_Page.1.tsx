"use client";
import React, { useEffect, useState } from "react";
import img from "../../../assets/images/dashbord/dashbord_page/flight.jpg";
import img1 from "../../../assets/images/dashbord/dashbord_page/plain1.jpg";
import Image from "next/image";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Icon } from "@iconify/react";
import { CircularProgress } from "@mui/material";

export default function Dashbord_Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading period

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
      >
        <Button variant="contained" startIcon={<Icon icon="mdi:passport" />}>
          VISA
        </Button>
        <Button variant="contained" startIcon={<Icon icon="mdi:flight" />}>
          Flight
        </Button>
        <Button
          variant="contained"
          startIcon={<Icon icon="material-symbols-light:hotel" />}
        >
          Hotel
        </Button>
      </Stack>
      <div className="flex justify-center">
        <Image src={img1} height={500} alt="flight" className=" w-10/12 mb-3" />
      </div>
      <div className=" flex justify-center items-center">
        <div className="bg-red-500 grid grid-cols-3 gap-2 w-10/12">
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
          <Image src={img} width={500} height={500} alt="flight" />
        </div>
      </div>
    </div>
  );
}
