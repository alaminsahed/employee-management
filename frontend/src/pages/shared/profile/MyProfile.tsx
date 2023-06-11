import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Card, Typography, Button, Paper } from "@mui/material";


import { isLogin } from "../../../utils/auth";
import { getDevice } from "../../../utils/getScreenSize";
import { toast } from "react-toastify";


const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState < any > ({});



  const params = useParams();
  const profileId = params.id;

  useEffect(() => {
    if (!isLogin()) {
      navigate("/");
    }
    profileId ? profileDetails() : fecthData();

  }, []);

  const profileDetails = async () => {
    const response = await axios(
      `http://localhost:5000/api/v1/employee/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setProfile(response.data);
  };

  const fecthData = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;

      setProfile(data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleProfileDelete = async (id: string) => {
    const removeData = await axios.delete(
      `http://localhost:5000/api/v1/employee/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (removeData.data.message) {
      alert(removeData.data.message);
      navigate("/profiles");
    }
  };

  return (
    <>
      {profileId ? (
        <Typography variant="h3" sx={{ textAlign: "center", padding: 2, fontFamily: "cursive", xs: { fontSize: "1rem" } }}>
          Profile Details
        </Typography>
      ) : (
        <Typography variant="h3" sx={{ textAlign: "center", padding: 2, fontFamily: "monospace", fontSize: { xs: "1rem", md: "3rem", sm: "2rem", } }}>
          My Profile
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: profileId ? "center" : "space-around",
        }}
      >
        {profileId ? (
          <>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: "3rem", p: 2, mt: 2, mr: 2 }}
              onClick={() => navigate(`/addEmployee/${profileId}`)}
              className="animate__animated animate__lightSpeedInRight animate__delay-2s"
            >
              Edit
            </Button>

            <Button
              color="error"
              variant="outlined"
              sx={{ height: "3rem", p: 2, mt: 2 }}
              onClick={() => handleProfileDelete(profileId)}
              className="animate__animated animate__lightSpeedInRight animate__delay-1s"
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              color="primary"
              variant="outlined"
              sx={{ height: "3rem", p: 2, m: 1 }}
              onClick={() => navigate("/changePassword")}
              className="animate__animated animate__lightSpeedInRight animate__delay-2s"
            >
              Change Password
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: "3rem", p: 2, m: 1 }}
              onClick={() => navigate("/profileEdit")}
              className="animate__animated animate__lightSpeedInRight animate__delay-2s"
            >
              Profile Edit
            </Button>
            <Button
              color="success"
              variant="outlined"
              sx={{ height: "3rem", p: 2, m: 1 }}
              onClick={() => navigate(`/claimLeaveRequest/${profile._id}`)}
              className="animate__animated animate__lightSpeedInRight animate__delay-1s"
            >
              Claim Leave
            </Button>
            <Button
              color="info"
              variant="outlined"
              sx={{ height: "3rem", p: 2, m: 1 }}
              onClick={() => navigate("/leaveRequestStatus")}
              className="animate__animated animate__lightSpeedInRight animate__delay-1s"
            >
              Leaves Status
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{ height: "3rem", p: 2, m: 1 }}
              onClick={() => navigate("/payslip")}
              className="animate__animated animate__lightSpeedInRight"
            >
              Download Pay Slip
            </Button>
          </>
        )}

      </Box>
      <Box sx={{ display: { md: "flex" }, flexDirection: { md: "row" }, justifyContent: "center", p: { md: 5 } }}>
        <Card
          sx={{
            padding: 5,
            margin: 2,
            width: { md: "40rem" },
            boxShadow: "md",
            translate: "translateY(50%)",
            bgcolor: "#526b59",
            color: "white",
          }}
          className="animate__animated animate__fadeInDownBig"
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              pb: 5,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Personal Information
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>Name: {profile?.name}</p>
              <p>Role: {profile?.role}</p>
              <p>Email: {profile?.email}</p>
              <p>Phone: {profile?.phone}</p>
              <p>Designation: {profile?.designation}</p>
              <p>Employee Status: {profile?.employeeStatus}</p>
            </div>
            <div>
              <p>Address: {profile?.address}</p>
              <p>Salary: {profile?.salary}</p>
              <p>Joinning Date: {profile?.joingDate}</p>
              <p>image</p>
              <img
                src={`http://localhost:5000${profile?.image}`}
                alt=""
                style={{ height: "10rem", width: "10rem" }}
              />
            </div>
          </Box>
        </Card>
        <Card
          sx={{
            padding: 5,
            margin: 2,
            width: { md: "40rem" },
            boxShadow: "md",
            translate: "translateY(50%)",
            bgcolor: "#bf6c5e",
            color: "#0d0201",
          }}
          className="animate__animated animate__lightSpeedInRight"
        >
          <div>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
            >
              Project Information
            </Typography>
            <p>Project Name: {profile?.currentProjects?.projectName}</p>
            <p>Resposiblity: {profile?.currentProjects?.responsiblity}</p>
            <p>Staus: {profile?.currentProjects?.status}</p>
          </div>
        </Card>
        <Card
          sx={{
            padding: 5,
            margin: 2,
            width: { md: "40rem" },
            boxShadow: "md",
            translate: "translateY(50%)",
            bgcolor: "#11465c",
            color: "white",
          }}
          className="animate__animated animate__slideInUp"
        >
          <div>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
            >
              Performance Information
            </Typography>
            <p>Bonus: {profile?.professionalInfo?.bonus}</p>
            <p>Total Leaves: {profile?.professionalInfo?.totalLeave}</p>
          </div>
        </Card>
      </Box>

    </ >
  );
};

export default MyProfile;
