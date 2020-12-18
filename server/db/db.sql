CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);
select *
from jobs
    left join(
        select job_id,
            COUNT(*),
            TRUNC(AVG(rating), 1) as average_rating
        from reviews
        group by job_id
    ) reviews on jobs.id = reviews.job_id;

/*CREATE TABLE jobs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    salary_range INT NOT NULL check(salary_range>=1 and salary_range<=5)
);

select job_id, Avg(rating), count(rating) from reviews group by job_id;
select * from jobs left join reviews on jobs.id = reviews.job_id;*/
