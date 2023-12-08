/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from "@mui/system";
import {
    ImageListItem,
    useMediaQuery,
  } from "@mui/material";

export const ImgStyled = styled("img")({
    width: "290px",
    height: "435px",
    objectFit: "cover",
  });
  
export const ImageListItemStyled = styled(ImageListItem)({
    overflow: "hidden",
  });
  
  export const calculateNumberOfCols = (theme) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  
    if (isXs) {
      return 1;
    } else if (isSm) {
      return 2;
    } else if (isMd) {
      return 3;
    } else if (isLg) {
      return 4;
    } else if (isXl) {
      return 5;
    }
  };
export const calculateImageListWidth = (theme) => {
    return `calc((290px * ${calculateNumberOfCols(theme)}) + (12px * ${calculateNumberOfCols(theme) - 1}))`;
  };