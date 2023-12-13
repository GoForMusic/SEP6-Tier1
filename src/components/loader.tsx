import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const LoaderWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(10),
}));

const TealCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "teal", // Sets the color to teal
}));

const Loader = () => {
  return (
    <LoaderWrapper>
      <TealCircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
