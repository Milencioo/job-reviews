require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all jobs list
app.get("/api/v1/jobs", async (req, res) => {
  try {
    //const results = await db.query("select * from jobs");
    const jobRatingsData = await db.query(
      "select * from jobs left join (select job_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by job_id) reviews on jobs.id = reviews.job_id;"
    );

    res.status(200).json({
      status: "success",
      results: jobRatingsData.rows.length,
      data: {
        jobs: jobRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});


//Get a Job
app.get("/api/v1/jobs/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const job = await db.query(
      "select * from jobs left join (select job_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by job_id) reviews on jobs.id = reviews.job_id where id = $1",
      [req.params.id]
    );
    // select * from jobs wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where job_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        job: job.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Job

app.post("/api/v1/jobs", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO jobs (name, location, salary_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.salary_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        job: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Jobs

app.put("/api/v1/jobs/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE jobs SET name = $1, location = $2, salary_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.salary_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Job

app.delete("/api/v1/jobs/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM jobs where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/jobs/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (job_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});



