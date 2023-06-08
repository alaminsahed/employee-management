import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { StyledPaperMain } from "./styles/ForgetPassword.styles";
import { LoginTextField } from "../../style/TextField.styles";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    postData();
  };

  const postData = async () => {
    if (email) {
      const res = await axios.post(
        "http://localhost:5000/api/v1/forgetPassword",
        {
          email: email,
        }
      );
      await res.data;

    }
    toast.success("Check your email for reset password link");
    navigate("/");
  };

  return (
    <StyledPaperMain>
      <Box
        sx={{
          height: 400,
          width: { md: 400, xs: 300 },
          backgroundColor: "darkslategray",
          color: "white",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,

        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ m: 2 }}>
          <LoginTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, border: 1, borderColor: "white" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </StyledPaperMain>
  );
};

export default ForgetPassword;
