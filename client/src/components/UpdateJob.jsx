import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";
import JobFinder from "../apis/JobFinder";

const UpdateJob = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { jobs } = useContext(JobsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await JobFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.job.name);
      setLocation(response.data.data.job.location);
      setSalaryRange(response.data.data.job.salary_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = await JobFinder.put(`/${id}`, {
      name,
      location,
      salary_range: salaryRange,
    });
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary_range">Salary Range</label>
          <input
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            id="salary_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
