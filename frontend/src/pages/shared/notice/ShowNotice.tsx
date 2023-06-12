import React, { useEffect } from "react";
import axios from "axios";
import { Grid, Card, Avatar } from "@mui/material";
import { deepOrange } from '@mui/material/colors';


const ShowNotice = () => {
  const [showNotice, setShowNotice] = React.useState([]);

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    try {
      axios.get("http://localhost:5000/api/v1/notice").then((res) => {
        const data = res.data;
        const user: any = JSON.parse(localStorage.getItem("user") || "{}");

        const myNotice = data.filter((notice: any) => {
          return notice.email === "" || notice.email === user.email;
        });
        setShowNotice(myNotice);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const sortedData = showNotice.sort((a: any, b: any) => {
    return +new Date(b.noticeDate) - +new Date(a.noticeDate);
  });
  return (
    <div>
      {sortedData.map((notice: any, index: any) => {
        return (
          <Card key={index} sx={{
            display: "flex", textAlign: "center", m: 1, cursor: "pointer", transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            }
          }}>
            <Grid container sx={{ width: "100vh" }}>
              <Grid item md={4} xs={4} lg={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 2 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>ADMIN</Avatar>
              </Grid>
              <Grid item md={4} xs={4} lg={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 2, fontFamily: "serif" }}>
                <h3>Title: {notice.noticeTitle}</h3>
                <p>{notice.noticeBody}</p>
              </Grid>
              <Grid item md={4} xs={4} lg={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 2 }}>
                <p>{notice.noticeFile}</p>
                <b>Date: {notice.noticeDate.slice(0, 10)}</b>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
  );
};

export default ShowNotice;
