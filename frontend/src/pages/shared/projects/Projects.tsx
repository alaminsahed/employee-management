import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { isLogin } from "../../../utils/auth";

const DataTable = React.lazy(() => import("../../../components/DataTable"));

const Projects = ({
  isprofiles,
  setIsProfiles,
}: {
  isprofiles: any;
  setIsProfiles: any;
}) => {
  const navigate = useNavigate();

  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState([]);
  const [currentPage, setCurrentPages] = React.useState(1);
  const [currentLimit, setCurrentLimit] = React.useState(3);

  useEffect(() => {
    if (!isLogin()) {
      navigate("/");
    }
    getProjectData();
  }, [currentPage]);

  const getProjectData = async () => {
    try {
      const res = await axios(
        `http://localhost:5000/api/v1/projects?currentPage=${currentPage}&currentLimit=${currentLimit}`
      );
      const json = await res.data;
      const { projects, pages, limit } = json;

      setResponse(projects);
      setCurrentPages(pages);
      setCurrentLimit(limit);
    } catch (error: any) {
      setError(error);
    }
  };

  if (error) {
    console.log(error);
  }

  const customData = response;

  setIsProfiles(false);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable customData={customData} isprofiles={isprofiles} />
      </Suspense>
    </div>
  );
};

export default Projects;
