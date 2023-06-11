import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { isAdmin } from "../../../utils/auth";

const DataTable = React.lazy(() => import("../../../components/DataTable"));

const Profiles = ({
  isprofiles,
  setIsProfiles,
}: {
  isprofiles: any;
  setIsProfiles: any;
}) => {
  const navigate = useNavigate();
  const [allProfiles, setAllProfiles] = React.useState < any > ([]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
    fecthProfiles();
  }, []);

  const fecthProfiles = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAllProfiles(response.data);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  setIsProfiles(true);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable customData={allProfiles} isprofiles={isprofiles} />
      </Suspense>
    </div>
  );
};

export default Profiles;
