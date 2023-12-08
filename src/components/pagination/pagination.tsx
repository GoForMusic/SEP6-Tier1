import React from "react";
import "../pagination/pagination.css";

const Pagination = ({ page, onPrevClick, onNextClick }) => {
  return (
    <div
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "50px",
      }}
    >
      <button className="button-18" onClick={onPrevClick}>
        Previous
      </button>
      <p className="pageNr">Page: {page}</p>
      <button className="button-18" onClick={onNextClick}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
