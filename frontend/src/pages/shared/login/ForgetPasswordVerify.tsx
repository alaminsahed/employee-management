import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalData from "../../../components/ModalData";

const ForgetPasswordVerify = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);


  useEffect(() => {
    postUserData();
  }, []);

  const postUserData = async () => {
    setLoading(true);
    const userData = await axios.get(
      `http://localhost:5000/api/v1/resetPassword/${id}/${token}`
    );
    if (userData.data) {
      const { decoded } = userData.data;
      localStorage.setItem("decoded", JSON.stringify(decoded));

      setLoading(false);
      navigate("/changepassword");
    }
  };

  setTimeout(() => {
    if (loading) {
      return (
        <ModalData title="Account Verification" content="Please wait. Your account is verifying." showBtn={false} />
      )
    }
    setError(true);
  }, 10000);

  useEffect(() => {
    navigate("/");
  }, [error]);

  return (
    <>{loading ? <ModalData title="Account Verification" content="Please wait. Your account is verifying." showBtn={false} /> : null}</>
  )
};

export default ForgetPasswordVerify;
