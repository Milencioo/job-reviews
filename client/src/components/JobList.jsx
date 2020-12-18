import React, { useEffect, useContext } from "react";
import JobFinder from "../apis/JobFinder";
import { JobsContext } from "../context/JobsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const JobList = (props) => {
  const { jobs, setJobs } = useContext(JobsContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await JobFinder.get("/");
        console.log(response.data.data);
        setJobs(response.data.data.jobs);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await JobFinder.delete(`/${id}`);
      setJobs(
        jobs.filter((job) => {
          return job.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/jobs/${id}/update`);
  };

  const handleJobSelect = (id) => {
    history.push(`/jobs/${id}`);
  };

  const renderRating = (job) => {
    if (!job.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={job.id} />
        <span className="text-warning ml-1">({job.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Job</th>
            <th scope="col">Location</th>
            <th scope="col">Salary Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {jobs &&
            jobs.map((job) => {
              return (
                <tr
                  onClick={() => handleJobSelect(job.id)}
                  key={job.id}
                >
                  <td>{job.name}</td>
                  <td>{job.location}</td>
                  <td>{"$".repeat(job.salary_range)}</td>
                  <td>{renderRating(job)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, job.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, job.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>

          <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
