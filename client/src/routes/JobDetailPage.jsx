import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";
import JobFinder from "../apis/JobFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const JobDetailPage = () => {
  const { id } = useParams();
  const { selectedJob, setSelectedJob } = useContext(
    JobsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await JobFinder.get(`/${id}`);
        console.log(response);

        setSelectedJob(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedJob && (
        <>
          <h1 className="text-center display-1">
            {selectedJob.job.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedJob.job.average_rating} />
            <span className="text-warning ml-1">
              {selectedJob.job.count
                ? `(${selectedJob.job.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedJob.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default JobDetailPage;
