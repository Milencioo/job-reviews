import React, { useState, useContext } from "react";
import JobFinder from "../apis/JobFinder";
import { JobsContext } from "../context/JobsContext";

const AddJob = () => {
  const { addJobs } = useContext(JobsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("Salary Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JobFinder.post("/", {
        name,
        location,
        salary_range: salaryRange,
      });
      console.log(response.data.data);
      addJobs(response.data.data.job);
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Salary Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"

          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
