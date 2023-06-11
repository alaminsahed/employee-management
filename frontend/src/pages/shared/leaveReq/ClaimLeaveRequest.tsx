import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography, Card, useMediaQuery, useTheme } from "@mui/material";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";

import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import DateRangePick from "../../../components/DateRangePick";
import animatedPlane from "../../../assets/images/paper-plane.gif";

const ClaimLeaveRequest = () => {
  const params = useParams();
  const employeeId = params.id;
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [leaveDurationValue, setLeaveDurationValue] = React.useState <
    DateRange < Dayjs >
  > ([null, null]);

  const [leaveRequest, setLeaveRequest] = React.useState < any > ({
    leaveType: "",
    leaveReason: "",
    leaveDuration: [] || leaveDurationValue,
  });

  const handleLeaveRequest = (e: any) => {
    leaveRequest.leaveDuration = leaveDurationValue;
    setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value });
  };

  const postLeaveRequest = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/v1/leaveRequest",
        {
          leaveRequestDate: leaveRequest.leaveDuration,
          leaveType: leaveRequest.leaveType,
          leaveReason: leaveRequest.leaveReason,
          employee: employeeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Leave Request Submitted");
      navigate("/leaveRequestStatus");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {
        !isMobile && !isTablet && (
          <Grid item sm={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2 }}>
            <Box sx={{ display: "flex" }}>
              <img src={animatedPlane} alt="animated_plane" style={{ width: "15%" }} />
              <Card sx={{ p: 2, border: 1, borderColor: "grey", boxShadow: "initial", zIndex: 1 }}>
                <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "fantasy" }} >
                  Feel Free To Take Your Leaves
                </Typography>
                <Box sx={{ p: 2, fontFamily: "fantasy", fontSize: "2rem" }}>
                  <p><b>Just keep some points in your mind before leave</b></p>
                  <br />
                  <ul>
                    <li>Please inform your Manager and Team</li>
                    <li>Resolve your dependencies</li>
                    <li>Handover your tasks to your teammates</li>
                    <li>Please communicate, if extends your leave</li>
                  </ul>

                  <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "fantasy", p: 2 }} >
                    Enjoy your time !
                  </Typography>
                </Box>

              </Card>
            </Box>

          </Grid>
        )
      }
      <Grid item xs={12} sm={12} md={6} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",

      }}>
        <Box
          sx={{
            backgroundColor: "#A5C9CA",
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 2,
            boxShadow: 3,
            transform: "translate(-50, -50)",
          }}
          className="project-form"
        >
          <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "serif" }} >
            Claim Your Leave
          </Typography>
          <br />
          <br />
          <form onSubmit={(e) => postLeaveRequest(e)}>
            <DateRangePick
              id="duration"
              name="duration"
              value={leaveDurationValue}
              ProjectDurationValue={leaveDurationValue}
              setProjectDurationValue={setLeaveDurationValue}
            />
            <br />
            <InputLabel id="leaveType">Leave Type</InputLabel>
            <Select
              labelId="leaveType"
              id="leaveType"
              name="leaveType"
              label="leaveType"
              value={leaveRequest.leaveType}
              onChange={handleLeaveRequest}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="sick">Sick leave</MenuItem>
              <MenuItem value="casualLeave">Casual leave</MenuItem>
              <MenuItem value="maternityLeave">Maternity leave</MenuItem>
              <MenuItem value="paterityLeave">Paternity leave</MenuItem>
              <MenuItem value="annualLeave">Annual leave</MenuItem>
              <MenuItem value="otherLeave">Other leave</MenuItem>
            </Select>
            <TextField
              fullWidth
              id="leaveReason"
              name="leaveReason"
              label="Leave Reason"
              value={leaveRequest.leaveReason}
              onChange={handleLeaveRequest}
              sx={{ marginBottom: 2 }}
            />
            <br />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Grid>

    </Grid>
  );
};

export default ClaimLeaveRequest;
