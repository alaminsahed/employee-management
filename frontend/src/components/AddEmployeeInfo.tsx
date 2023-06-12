import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import DatePick from "./DatePick";
import { toast } from "react-toastify";
import bgImage from "../assets/images/bg-update-profile.jpg";

const AddEmployeeInfo = ({
  handleChange,
  values,
  continues,
  joiningDateInfo,
  setJoiningDateInfo,
  setEmployeeImg,
  employeeDetails = null,
  myProfileUpdate = false,
}: any) => {
  const navigate = useNavigate();

  if (employeeDetails) {
    values.name = employeeDetails.name;
    values.email = employeeDetails.email;
    values.phone = employeeDetails.phone;
    values.role = employeeDetails.role;
    values.address = employeeDetails.address;
    values.salary = employeeDetails.salary;
    values.employeeStatus = employeeDetails.employeeStatus;
    values.designation = employeeDetails.designation;
    values.joiningDate = employeeDetails.joiningDate;
    values.image = employeeDetails.image;
  }

  const uploadImgHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/uploads",
        formData,
        config
      );
      console.log("data", data);
      setEmployeeImg(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatedMyProfileData = async () => {
    try {
      const updateData = await axios.put(
        "http://localhost:5000/api/v1/profile/edit",
        employeeDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast(updateData.data.message);
      navigate("/myprofile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        height: myProfileUpdate ? "100vh" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundImageOpacity: -0.5,
      }}
    >
      <Box
        sx={{
          height: myProfileUpdate ? '55%' : '100%',
          width: "50%",
          backgroundColor: "#FFFFFF",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          m: 2,

        }}
      >
        {myProfileUpdate ? (
          <>
            <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "serif" }} >
              Let's Update Your Profile
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "serif" }} >
              Add Employee's Personal Information
            </Typography>
          </>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
          <form style={{ display: "flex", flexDirection: "column" }}>

            <TextField
              id="name"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
            />

            {myProfileUpdate ? null : (
              <>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange("email")}
                  margin="normal"
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  margin="normal"
                />
                <InputLabel id="role"> Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={values.role}
                  label="role"
                  onChange={handleChange("role")}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </>
            )}
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              value={values.phone}
              onChange={handleChange("phone")}
              margin="normal"
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              value={values.address}
              onChange={handleChange("address")}
              margin="normal"
            />
            <input
              accept="image/*"
              name="image"
              id="contained-button-file"
              type="file"
              style={{ padding: 10 }}
              onChange={uploadImgHandler}
            />
            {myProfileUpdate ? (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={updatedMyProfileData}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <TextField
                  id="salary"
                  name="salary"
                  label="Salary"
                  value={values.salary}
                  onChange={handleChange("salary")}
                  margin="normal"
                />

                <InputLabel id="designation">Designation</InputLabel>
                <Select
                  labelId="designation"
                  id="designation"
                  value={values.designation}
                  label="Designation"
                  onChange={handleChange("designation")}
                >
                  <MenuItem value="pm">PM</MenuItem>
                  <MenuItem value="engineer">Engineer</MenuItem>
                  <MenuItem value="leadEngineer">Lead Engineer</MenuItem>
                  <MenuItem value="associate">Associate</MenuItem>
                </Select>

                <InputLabel id="employeeStatus">Employee Status</InputLabel>
                <Select
                  labelId="employeeStatus"
                  id="employeeStatus"
                  value={values.employeeStatus}
                  label="Employee Status"
                  onChange={handleChange("employeeStatus")}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="deactive">Deactive</MenuItem>
                </Select>

                <br />

                <br />
                <DatePick
                  onChange={handleChange("joiningDate")}
                  joiningDateInfo={joiningDateInfo}
                  setJoiningDateInfo={setJoiningDateInfo}
                />
                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={continues}
                >
                  Continue
                </Button>
              </>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployeeInfo;
