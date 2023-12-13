import React from "react";
import "../pagination/pagination.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

const Pagination = ({ page, onPrevClick, onNextClick, isNextDisabled }) => {
  return (
    <div
      className="pagination-container"
      style={{
        marginTop: "2.5rem",
        marginBottom: "3.5rem",
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
              color: "#4db6ac",
            },
          }}
        ></ArrowBackIosNewIcon>
      </IconButton>
      <p className="pageNr">Page: {page}</p>
      <IconButton onClick={onNextClick} disabled={isNextDisabled}>
        <ArrowForwardIosIcon
          sx={{
            color: "white",
            borderRadius: "20px",
            height: "2rem",
            width: "2rem",
            transition: " 0.35s ease",
            "&:hover": {
              color: "#4db6ac",
            },
          }}
        ></ArrowForwardIosIcon>
      </IconButton>
    </div>
  );
};

export default Pagination;
