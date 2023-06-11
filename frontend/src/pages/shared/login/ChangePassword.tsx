import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Box, Button, Paper, Card, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { LoginTextField } from "../../style/TextField.styles";
import backgroundImage from "../../../assets/images/bg-change-pass.jpg";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const inputContainer = [
    { id: "password", name: "password", label: "New Password", type: "password", onChange: (e: any) => setNewPassword(e.target.value) },
    { id: "confirm-password", name: "confirm-password", label: "Confirm Password", type: "password", onChange: (e: any) => setConfirmPassword(e.target.value) }
  ]

  const decoded = JSON.parse(localStorage.getItem("decoded") || "{}");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      decoded.email ? forgetPassword() : changePassword();
    } else {
      toast.error("Password does not match");
    }
  };

  const changePassword = async () => {
    const res = await axios.put(
      "http://localhost:5000/api/v1/profile/changePassword",
      { password: newPassword },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.data;

    toast(data.message);
    navigate("/myprofile");
  };

  const forgetPassword = async () => {
    const res = await axios.put(
      "http://localhost:5000/api/v1/resetPassword/newPassword",
      {
        password: newPassword,
        id: decoded._id,
        email: decoded.email,
      }
    );
    const data = res.data;
    console.log("data", data);
    navigate("/");
    localStorage.removeItem("decoded");
  };

  return (
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#B9DEE1"
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Card
        sx={{
          height: "50vh",
          width: { md: 600, xs: 320, sm: 400 },
          backgroundColor: "gray",
          p: 2,
          borderRadius: 2,
          textAlign: "center",
          border: 1,
          borderColor: "white",
          boxShadow: 3,
          zIndex: 1,

        }}
      >
        <Typography variant="h4" sx={{ color: "white", p: 1 }}>
          Change Password
        </Typography>
        <br />
        <Box sx={{
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <form onSubmit={handleSubmit}>
            {/* <TextField
            fullWidth
            id="password"
            name="password"
            label="New Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          /> */}
            {
              inputContainer.map((input, index) => {
                return (
                  <LoginTextField
                    fullWidth
                    id={input.id}
                    name={input.name}
                    label={input.label}
                    type={input.type}
                    onChange={input.onChange}
                    sx={{ marginBottom: 2 }}
                    key={index}
                  />
                )
              })
            }
            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ border: 1, borderColor: "white" }}>
              Submit
            </Button>
          </form>
        </Box>
      </Card>
    </Paper>
  );
};

export default ChangePassword;
