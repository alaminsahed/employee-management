import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Paper, Grid, Box, Button, Link, Typography } from "@mui/material";


import loginImage from "../../../assets/images/bg-login.jpg";
import { LoginTextField } from "../../style/TextField.styles";


const Login = ({ socket }: any) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const loginInputContainer = [
    { name: "email", label: "Email Address", type: "email", value: email, onChange: (e: any) => setEmail(e.target.value), autoComplete: "email", autoFocus: true },
    { name: "password", label: "Password", type: "password", value: password, onChange: (e: any) => setPassword(e.target.value), autoComplete: "current-password", autoFocus: false }
  ]

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    postData();
  };

  const postData = () => {
    axios
      .post("http://localhost:5000/api/v1/login", {
        email: email,
        password: password,
      })
      .then((res: any) => {
        const { employeeExists } = res.data;

        socket?.emit("newUser", employeeExists.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.employeeExists));
        if (res.data.employeeExists.employeeStatus === "deactive") {
          alert("Your account is deactivated");
          return;
        }
        navigate("/home");
      })
      .catch((err: any) => {
        console.log(err.response);
        toast.error(err.response.data);

        //alert(err.response.data);
      });
  };

  return (
    <Grid container component={Paper} sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <img src={loginImage} alt="login" style={{ width: "100%", height: "80%", objectFit: "cover" }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eae5db"
        }}>
          <Box
            sx={{
              height: 600,
              width: { md: 600, xs: 300 },
              backgroundColor: "darkslategray",
              color: "white",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderRadius: 2,
              boxShadow: 3,
              borderColor: "white"
            }}
          >
            <Typography component="h1" variant="h5">
              SIGN IN
            </Typography>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ m: 2 }}>
              {
                loginInputContainer.map((input, index) => {
                  return (
                    <LoginTextField
                      key={index}
                      margin="normal"
                      required
                      fullWidth
                      id={input.name}
                      label={input.label}
                      name={input.name}
                      onChange={input.onChange}
                      autoComplete={input.autoComplete}
                      autoFocus={input.autoFocus}

                    />
                  )
                })
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, border: 1, borderColor: "white" }}
              >
                Sign In
              </Button>
            </Box>
            <Link
              href="/forgetpassword"
              variant="button"
              sx={{ bgcolor: "white", padding: 1, borderRadius: 1 }}
            >
              Forget password
            </Link>
          </Box>
        </Paper>
      </Grid>
    </Grid>

  );
}

export default Login;
