import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const LoginTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "wheat",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
    "&.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
  },
}));
