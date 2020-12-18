import React from "react";
import Header from "../components/Header";
import AddJob from "../components/AddJob";
import JobList from "../components/JobList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddJob />
      <JobList />
    </div>
  );
};

export default Home;
