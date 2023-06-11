import React, { Suspense, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Box, CardContent, Grid, Typography } from "@mui/material";
import signatureImg from "../../../assets/images/signature.png";

const PdfDownloader = React.lazy(() => import("../../../components/PdfDownloader"));

const Payslip = () => {
  const uuid = uuidv4();
  const [payslipData, setPayslipData] = React.useState < any > ([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "[]");
    setPayslipData(data);
  }, []);

  const { name, email, salary, role, joingDate } = payslipData;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ height: "50vh" }}>
        <div id="payslipId">
          <CardContent>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Payment Slip
            </Typography>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid",
                padding: "10px",
                marginTop: "60px",
              }}
            >
              <Grid sx={{ lineHeight: 2, p: 2 }}>
                <div>
                  <b>Month:</b>{new Date().toLocaleString('default', { month: 'long' })}
                </div>
                <div>
                  <b>Employee Id:</b> {uuid?.toString().substring(0, 6)}
                </div>
                <div>
                  <b>Name:</b>{name}
                </div>
                <div>
                  <b>Email:</b> {email}
                </div>
                <div>
                  <b>Position:</b>{role}
                </div>
                <div>
                  <b>Salary:</b>{salary}
                </div>
                <div>
                  <b>Joining Date:</b>{joingDate?.split("T")[0]}
                </div>
              </Grid>
              <Grid sx={{ lineHeight: 2, p: 2 }}>
                <div>
                  <b>Organization Name:</b> ABC Company
                </div>
                <div>
                  <b>Organization Address:</b> 123, XYZ Street, ABC City
                </div>
                <div>
                  <b>Organization Contact:</b> 1234567890
                </div>
                <div>
                  <b>Organization Email:</b> contact@abc.org
                </div>
                <div>
                  <b>Organization Website:</b> www.abc.org
                </div>
                <div>
                  <b>Authority signature</b>
                  <br />
                  <img src={signatureImg} alt="authority-signature" style={{ height: "50%", width: "50%" }} />
                  <br />
                  <small>Administration Officer</small>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            marginRight: "20px",
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <PdfDownloader
              downloadFileName="PayslipPdf"
              rootElementId="payslipId"
            />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Payslip;
