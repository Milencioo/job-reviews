import React, { useState, createContext } from "react";

export const JobsContext = createContext();

export const JobsContextProvider = (props) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const addJobs = (job) => {
    setJobs([...jobs, job]);
  };
  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
        addJobs,
        selectedJob,
        setSelectedJob,
      }}
    >
      {props.children}
    </JobsContext.Provider>
  );
};
