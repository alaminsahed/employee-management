import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination
} from "@mui/material";

const LeaveReqDataTable = ({ allLeaveRequest }: any) => {
  const [leaveData, setLeaveData] = useState < any > ([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = React.useState(5);


  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const data = allLeaveRequest.filter(
        (data: any) => data.employee._id === userData._id
      );
      setLeaveData(data);
    }
  }, [allLeaveRequest]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = leaveData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = leaveData.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
          m: 2,
        }}
      >
        <Typography variant="h4">Leave Request Status</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "gray" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Leave Duration</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Leave Type
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Leave Reason
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Leave Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.length ? currentPosts.map((row: any) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <>
                  <TableCell component="th" scope="row">
                    {row.leaveRequestDate[0].slice(0, 10)} TO{" "}
                    {row.leaveRequestDate[1].slice(0, 10)}
                  </TableCell>

                  <TableCell align="center">{row.leaveType}</TableCell>

                  <TableCell align="center">{row.leaveReason}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor:
                        row.leaveStatus === "Rejected" ? "red" : row.leaveStatus === "Pending" ? "wheat" : "green",
                      color:
                        row.employeeStatus === "Rejected" ? "white" : "inherit",
                      borderRadius: "5px",
                    }}
                  >
                    {row.leaveStatus}
                  </TableCell>
                </>
              </TableRow>
            )) : <Box sx={{ width: "100vh", textAlign: "center" }}>No Data Available</Box>}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={pageNumbers.length} onChange={(e, page) => paginate(page)} />
    </Box>
  );
};

export default LeaveReqDataTable;
