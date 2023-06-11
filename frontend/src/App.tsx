import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/shared/home/Homepage";
import Login from "./pages/shared/login/Login";
import Profiles from "./pages/admin/profile/Profiles";
import Projects from "./pages/shared/projects/Projects";
import NavBar from "./components/NavBar";
import MyProfile from "./pages/shared/profile/MyProfile";
import AddProject from "./pages/admin/projects/AddProject";
import AddEmployee from "./pages/admin/profile/AddEmployee";
import NotFound from "./pages/shared/NotFound/NotFound";
import ChangePassword from "./pages/shared/login/ChangePassword";
import AddEmployeeForm from "./components/AddEmployeeForm";
import Payslip from "./pages/shared/payslip/Payslip";
import EditMyProfile from "./pages/shared/profile/EditMyProfile";
import ForgetPasswordVerify from "./pages/shared/login/ForgetPasswordVerify";
import ForgetPassword from "./pages/shared/login/ForgetPassword";
import { io } from "socket.io-client";
import AllLeaveRequest from "./pages/admin/leaveReqLists/AllLeaveRequest";
import ClaimLeaveRequest from "./pages/shared/leaveReq/ClaimLeaveRequest";
import LeaveReqStatus from "./pages/shared/leaveReq/LeaveReqStatus";
import NoticeBoard from "./pages/shared/notice/NoticeBoard";
import ShowNotice from "./pages/shared/notice/ShowNotice";

function App() {
  const [isprofiles, setIsProfiles] = React.useState < any > (true);
  const [socket, setSocket] = useState < any > (null);
  const [user, setUser] = useState < any > (null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    const userData: any = localStorage.getItem("user");
    setUser(JSON.parse(userData)?.name);

    if (user) {
      console.log("userId", user, socket);
      socket?.emit("newUser", user);
    }
  }, [user, socket]);

  return (
    <BrowserRouter>
      <NavBar socket={socket} user={user} />
      <Routes>
        <Route path="/" element={<Login socket={socket} user={user} />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myprofile/:id" element={<MyProfile />} />
        <Route
          path="/projects"
          element={
            <Projects isprofiles={isprofiles} setIsProfiles={setIsProfiles} />
          }
        />
        <Route
          path="/profiles"
          element={
            <Profiles isprofiles={isprofiles} setIsProfiles={setIsProfiles} />
          }
        />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/addProject/:id" element={<AddProject />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route
          path="/addEmployee/:id"
          element={<AddEmployeeForm socket={socket} />}
        />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/profileEdit" element={<EditMyProfile />} />
        <Route path="/payslip" element={<Payslip />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/allLeaveRequest" element={<AllLeaveRequest />} />
        <Route path="/leaveRequestStatus" element={<LeaveReqStatus />} />
        <Route path="/claimLeaveRequest/:id" element={<ClaimLeaveRequest />} />
        <Route path="/noticeboard" element={<NoticeBoard />} />
        <Route path="/showNoticeBoard" element={<ShowNotice />} />
        <Route
          path="/resetPassword/:id/:token"
          element={<ForgetPasswordVerify />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
