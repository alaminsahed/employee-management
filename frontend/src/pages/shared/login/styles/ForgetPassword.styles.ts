import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import bgForgetPass from "../../../../assets/images/forget-pass.jpg";

export const StyledPaperMain = styled(Paper)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${bgForgetPass})`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "wheat",
  backgroundSize: "cover",
  [theme.breakpoints.down("sm")]: {
    backgroundSize: "100%",
  },
  [theme.breakpoints.up("md")]: {
    backgroundSize: "50%",
  },
}));
