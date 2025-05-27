import Code from "./codes/code";

const ProjectList = {
  SQL: [
    {
      name: "Cyclistic Bike Share Analysis",
      image: "/assets/cyclistic.png",
      medium: "https://medium.com/@rafsanahmed2828/from-data-to-insights-googles-cyclistic-case-study-04fb362c2d0d",
      github: "https://github.com/rafsanahmed28/Cyclistic-Case-Study",
      tags: ["MySQL", "Excel", "Tableau", "Data Visualization", "Analytics"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Analyzed Cyclistic bike share data to identify customer segments and usage patterns.",
        },
        { name: "cleaning.sql", type: "code", content: Code("Cyclistic").cleaning, language: "sql" },
        { name: "querying.sql", type: "code", content: Code("Cyclistic").querying, language: "sql" },
        { name: "viz_query.sql", type: "code", content: Code("Cyclistic").viz_query, language: "sql" }
      ],
    },

    {
      name: "Covid-19 Exploratory Data Analysis",
      image: "/assets/covid19.png",
      github: "https://github.com/rafsanahmed28/Covid-Data-Exploration-Project",
      tags: ["MySQL", "Excel", "Tableau", "Data Visualization", "Analytics"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Performed exploratory data analysis on Covid-19 data to uncover trends and insights.",
        },
        {
          name: "covid19.sql",
          type: "code",
          content: Code("Covid19"),
          language: "sql",
        },
      ],
    },

    {
      name: "Data Cleaning - NashVille Housing Data",
      image: "/assets/nashville.png",
      github: "https://github.com/rafsanahmed28/Data-Cleaning-MySQL",
      tags: ["MySQL", "Analytics"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Cleaned and transformed Nashville housing data for analysis, focusing on data integrity and consistency.",
        },
        {
          name: "nasvhille.sql",
          type: "code",
          content: Code("Nashville"),
          language: "sql",
        },
      ],
    }
  ],
  Python: [
    {
      name: "Amazon Web Scraping",
      image: "/assets/truth.png",
      github: "https://github.com/rafsanahmed28/Amazon-Web-Scraping",
      tags: ["pandas", "matplotlib", "forecasting"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Built a web scraper to track price changes of a specific product on Amazon and send email to myself using Python libraries BeautifulSoup, and pandas.",
        },
        {
          name: "amazon.ipynb",
          type: "notebook",
          content: "/amazon.html",
          language: "python",
        },
      ],
    },

    {
      name: "Movie Correlation Analysis",
      image: "/assets/truth.png",
      github: "https://github.com/rafsanahmed28/Movie-Correlation---Pandas-NumPy-SNS",
      tags: ["pandas", "numpy", "seaborn", "matplotlib"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Built a correlation analysis of movies using Python, pandas, and seaborn.",
        },
        {
          name: "correlation.ipynb",
          type: "notebook",
          content: "/correlation.html",
          language: "python",
        },
      ],
    },

    {
      name: "Automating Crypto Data using CoinGecko API",
      image: "/assets/truth.png",
      github: "https://github.com/rafsanahmed28/Automating-Crypto-Data-using-CoinGecko-API",
      tags: ["pandas", "matplotlib", "forecasting"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Automated the retrieval of cryptocurrency data using the CoinGecko API and performed analysis using Python libraries pandas and matplotlib.",
        },
        {
          name: "crypto.ipynb",
          type: "notebook",
          content: "/crypto.html",
          language: "python",
        },
      ],
    }
  ],
  Tableau: [
    {
      name: "Cyclistic Case Study Visualization",
      image: "/assets/cyclisticviz.png",
      tableau: "https://public.tableau.com/app/profile/rafsan.ahmed8668/viz/GoogleCyclisticCaseStudyVisualization/DashboardMain",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Designed an interactive Tableau dashboard for sales KPIs and trends.",
        }
      ],
    },

    {
      name: "Covid-19 Data Visualization Dashboard",
      image: "/assets/covid19viz.png",
      tableau: "https://public.tableau.com/app/profile/rafsan.ahmed8668/viz/CovidDataVisualizationDashboard-May2024/Dashboard1",
      tags: ["Tableau", "Data Visualization"],
      files: [
        {
          name: "README.md",
          type: "info",
          content: "Designed an interactive Tableau dashboard for Covid-19 Global Death Statistics.",
        }
      ],
    },
  ],
};

export default ProjectList;