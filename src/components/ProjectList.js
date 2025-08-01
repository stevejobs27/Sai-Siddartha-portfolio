import Code from "./codes/code";

const ProjectList = {
  SQL: [
    {
      name: "Spotify Data Analysis",
      image: "/assets/spotify_logo.jpg",
      github: "https://github.com/stevejobs27/Spotify_Data_Analysis_with_SQL",
      dataset: "https://www.kaggle.com/datasets/sanjanchaudhari/spotify-dataset",
      tags: ["PostgreSQL", "Data Analysis"],
      files: [
        {
          name: "README.md",
          type: "info",
          content:
            "The goal of this project is to analyze Spotify's track-level data to understand what audio features contribute to a song’s popularity. Using SQL, I explored trends in energy, danceability, valence, loudness, and more across genres and years. The analysis helps identify patterns behind hit tracks and genre behavior over time."
        },
        {
          name: "cleaning.sql",
          type: "code",
          language: "sql",
          content: `-- EDA

SELECT COUNT(*) from spotify;
SELECT COUNT(DISTINCT artist) from spotify;
SELECT MAX(duration_min) AS total_streaming FROM spotify;
SELECT MIN(duration_min) AS least_streaming FROM spotify;
SELECT DISTINCT album_type from spotify;
SELECT COUNT(DISTINCT album) from spotify;
SELECT * from spotify WHERE duration_min = 0;
DELETE FROM spotify WHERE duration_min = 0;
SELECT COUNT(DISTINCT channel) from spotify;`
        },
        {
          name: "querying.sql",
          type: "code",
          language: "sql",
          content: `-- Basic Analysis

-- Q1: Tracks with > 1B streams
SELECT track FROM spotify WHERE stream > 1000000000 LIMIT 100;

-- Q2: All albums & their artists
SELECT DISTINCT album, artist FROM spotify ORDER BY 1;

-- Q3: Comments count for licensed tracks
SELECT SUM(comments) AS total_count FROM spotify WHERE licensed = 'true';

-- Q4: Tracks in single album type
SELECT COUNT(track) FROM spotify WHERE album_type = 'single';

-- Q5: Total number of tracks by each artist
SELECT artist, COUNT(*) AS no_of_songs FROM spotify GROUP BY artist ORDER BY 2 DESC;

-- Q6: Average danceability by album
SELECT album, AVG(danceability) as dance_ability FROM spotify GROUP BY 1 ORDER BY 2 DESC;

-- Q7: Top 5 tracks by energy
SELECT track, MAX(energy) FROM spotify GROUP BY 1 ORDER BY 2 DESC;

-- Q8: Views and likes where official video is true
SELECT DISTINCT track, views, likes FROM spotify WHERE official_video = 'true' ORDER BY 2 DESC;

-- Q9: Total views per album
SELECT album, SUM(views) FROM spotify GROUP BY 1 ORDER BY 1 DESC;

-- Q10: Tracks streamed more on Spotify than YouTube
SELECT * FROM (
  SELECT track,
        COALESCE(SUM(CASE WHEN most_played_on = 'Youtube' THEN stream END),0) AS streamed_on_youtube,
        COALESCE(SUM(CASE WHEN most_played_on = 'Spotify' THEN stream END),0) AS streamed_on_spotify
  FROM spotify
  GROUP BY 1
) AS s1
WHERE streamed_on_spotify > streamed_on_youtube
  AND streamed_on_youtube != 0;`
        },
        {
          name: "viz_query.sql",
          type: "code",
          language: "sql",
          content: `-- Advanced Visual Queries

-- Q11: Top 3 most-viewed tracks per artist
WITH cte AS (
  SELECT artist, track, SUM(views) as total_view,
        DENSE_RANK() OVER(PARTITION BY artist ORDER BY SUM(views) DESC) as rank
  FROM spotify
  GROUP BY artist, track
)
SELECT * FROM cte WHERE rank <= 3;

-- Q12: Tracks where liveness is above average
SELECT track, liveness FROM spotify WHERE liveness > (SELECT AVG(liveness) FROM spotify);

-- Q13: Energy range (max - min) per album
WITH cte2 AS (
  SELECT album, MAX(energy) AS higher_energy, MIN(energy) AS lower_energy
  FROM spotify
  GROUP BY 1
)
SELECT album, higher_energy - lower_energy AS energy_range FROM cte2;

-- Q14: Energy-to-liveness ratio > 1.2
SELECT track, energy, liveness, (energy/liveness) AS energy_liveness_ratio
FROM spotify
WHERE liveness > 0 AND (energy/liveness) > 1.2;

-- Q15: Cumulative sum of likes ordered by views
SELECT DISTINCT track,
      SUM(likes) OVER (ORDER BY views) AS cumulative_likes,
      views
FROM spotify
ORDER BY 1, 3 DESC;`
        }
      ]
    },
    {
      name: "Amazon USA Sales Data Analysis",
      image: "/assets/amazon.png",
      github: "https://github.com/stevejobs27/Amazon_sales_project",
      tags: ["PostgreSQL", "Data Analysis","Data Modelling"],
      files: [
        {
          name: "README.md",
          type: "info",
          content:
            "I have worked on analyzing a dataset of over 20,000 sales records from an Amazon-like e-commerce platform. This project involves extensive querying of customer behavior, product performance, and sales trends using PostgreSQL. Through this project, I have tackled various SQL problems, including revenue analysis, customer segmentation, and inventory management. The project also focuses on data cleaning, handling null values, and solving real-world business problems using structured queries."
        },
        {
          name: "cleaning.sql",
          type: "code",
          language: "sql",
          content: `-- DATA CLEANING

-- Check for NULLs
SELECT COUNT(*) FROM customers WHERE customer_id IS NULL;
SELECT COUNT(*) FROM products WHERE product_id IS NULL;

-- Remove duplicate records
DELETE FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM (
    SELECT customer_id, ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY customer_id) AS row_num
    FROM customers
  ) t
  WHERE t.row_num > 1
);

-- Remove invalid entries
DELETE FROM products WHERE price IS NULL OR price <= 0;
DELETE FROM inventory WHERE stock IS NULL;

-- Trim strings
UPDATE sellers SET seller_name = TRIM(seller_name);
UPDATE products SET product_name = TRIM(product_name);

-- Standardize casing
UPDATE customers SET customer_name = INITCAP(customer_name);
UPDATE products SET category = LOWER(category);`
        },
        {
          name: "querying.sql",
          type: "code",
          language: "sql",
          content: `-- ANALYSIS QUERIES

-- 1. Top 10 selling products
SELECT product_id, SUM(quantity) AS total_sold
FROM order_items
GROUP BY product_id
ORDER BY total_sold DESC
LIMIT 10;

-- 2. Revenue per category
SELECT p.category, SUM(oi.total_sale) AS revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.category
ORDER BY revenue DESC;

-- 3. Monthly revenue trend
SELECT DATE_TRUNC('month', o.order_date) AS month, SUM(oi.total_sale) AS monthly_revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY month
ORDER BY month;

-- 4. Returning vs New customers
SELECT
  CASE
    WHEN order_count = 1 THEN 'New'
    ELSE 'Returning'
  END AS customer_type,
  COUNT(*) AS customer_count
FROM (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  GROUP BY customer_id
) t
GROUP BY customer_type;

-- 5. Inventory status
SELECT product_id, stock
FROM inventory
ORDER BY stock ASC
LIMIT 10;

-- 6. Year-over-year revenue change
SELECT EXTRACT(YEAR FROM order_date) AS year, SUM(oi.total_sale) AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY year
ORDER BY year;`
        },
      ],
    },
  ], 

  Python: [
    {
      name: "New York Airbnb Data Analysis",
      image: "/assets/New-York-City-Brooklyn-Bridge-Panorama-Juergen-Roth-2.jpg",
      github: "https://github.com/stevejobs27/Airbnb_project_EDA_python",
      tags: ["Python", "Pandas", "Numpy", "Seaborn", "Matplotlib","Feature Engineering", "EDA"],
      dataset: "https://github.com/stevejobs27/Airbnb_project_EDA_python/blob/main/datasets%20(1).csv",
      files: [
        {
          name: "README.md",
          type: "info",
          content: "This project performs Exploratory Data Analysis (EDA) on New York Airbnb data to uncover trends and patterns in rental listings.  using Python libraries like Pandas, NumPy, and Seaborn. The project includes data cleaning, transformation, and visualization to uncover insights ",
        },
        {
          name: "correlation.ipynb",
          type: "notebook",
          content: "https://nbviewer.org/github/stevejobs27/Airbnb_project_EDA_python/blob/main/airbnb_project_note.ipynb",
          language: "python",
        },
      ],
    },

    {
      name: "Super Store Data Analysis",
      image: "assets/python_project_front_page.png",
      github: "https://github.com/stevejobs27/Super_store-analysis-using-Python",
      tags: ["Pandas", "Seaborn", "Matplotlib","EDA"],
      dataset: "https://github.com/stevejobs27/Super_store-analysis-using-Python/blob/main/train.csv",
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Performed an in-depth exploratory data analysis (EDA) on a retail superstore dataset to uncover sales trends, customer segments, product performance, and regional insights. The goal was to derive actionable business insights through data cleaning, aggregation, and visualization.",
        },
        {
          name: "sales Analysis.ipynb",
          type: "notebook",
          content: " https://nbviewer.org/github/stevejobs27/Super_store-analysis-using-Python/blob/main/Super%20Store%20Sales%20Analysis-Copy1.ipynb",
          language: "python",
        },
      ],
    },

    
        
      
    
  ],

  POWERBI: [
    {
      name: "Costco Sales Analysis Dashboard",
      image: "/assets/finaloutputpowerbi.png",
      powerbi: "https://app.powerbi.com/view?r=eyJrIjoiZWMyYjNhMDMtNWRiNi00YzdmLThlZWQtNWJhOWUxYWFjYThiIiwidCI6IjRhNGM3NWExLWZlNjQtNDM3Ny1hNjBjLTMxZGQ4YTc4OTQ5YSJ9",
      tags: ["Powerbi", "Data Visualization", "Data Modelling"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "This project involves creating a comprehensive sales analysis dashboard for Costco using Power BI. The dashboard provides insights into sales performance, customer behavior, and product trends. It includes interactive visualizations and data models to help stakeholders make informed decisions based on the sales data.",
        }
      ],
    },
  ],  

};    


export default ProjectList;
