import React, { useEffect, useState } from "react";
import { isAdmin, isLogin } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Paper, Grid } from "@mui/material";
import { StyledSpan, StyledCard } from "./styles/Homepage.styles";
import HomepageImage from "../../../assets/images/homepage2.gif";

const Homepage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (!isLogin()) {
      navigate("/");
    }
    const employeeHome: any = JSON.parse(localStorage.getItem("user") || "{}");
    setUserName(employeeHome.name);
  }, []);

  return (
    <Grid container component={Paper}>
      <Grid md={6}>
        <img src={HomepageImage} alt="homepage" style={{ width: "80%", height: "80%" }} />
      </Grid>
      <Grid md={6} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        height: "100vh",
        width: "100%"
      }}>

        <StyledCard
        >
          <Typography variant="h4" component="div" sx={{
            margin: "auto", fontWeight: "", "@media (max-width: 600px)": {
              textAlign: "center"
            }
          }}>
            Hello <StyledSpan>{userName}</StyledSpan>
            <br />
            <br />
            {isAdmin() ? <p>Let's start your admin works !</p> : <p> Take a cup of coffee and jump into the work !</p>}
          </Typography>
        </StyledCard>
      </Grid>

    </Grid>
  );
};

export default Homepage;
