import React from "react";
import "../pagination/pagination.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

const Pagination = ({ page, onPrevClick, onNextClick }) => {
  return (
    <div
      className="pagination-container"
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <IconButton onClick={onPrevClick}>
        <ArrowBackIosNewIcon
          sx={{
            color: "white",
            borderRadius: "20px",
            height: "2rem",
            width: "2rem",
            transition: " 0.35s ease",
            "&:hover": {
              backgroundColor: "#0d7377",
              boxShadow: "0 0 10px 10px #0d7377", // Soft, spread shadow for hover effect
              color: "white",
            },
          }}
        ></ArrowBackIosNewIcon>
      </IconButton>
      <p className="pageNr">Page: {page}</p>
      <IconButton onClick={onNextClick}>
        <ArrowForwardIosIcon
          sx={{
            color: "white",
            borderRadius: "20px",
            height: "2rem",
            width: "2rem",
            transition: " 0.35s ease",
            "&:hover": {
              backgroundColor: "#0d7377",
              boxShadow: "0 0 10px 10px #0d7377", // Soft, spread shadow for hover effect
              color: "white",
            },
          }}
        ></ArrowForwardIosIcon>
      </IconButton>
    </div>
  );
};

export default Pagination;
