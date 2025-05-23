import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (isHorizontal) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  } else {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  if (isHorizontal) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  } else {
    return {
      id: `vertical-tab-${index}`
    };
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    height: 300
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    Reflect: {
      jobTitle: "Data Analyst @",
      duration: "JAN 2023 - APR 2024",
      desc: [
        "Conducted 20+ customer interviews to understand user needs and pain points, translating insights into actionable business requirements and aligning product development with customer demands",
        "Successfully secured $13,000 in grant funding by winning both Stage 1 and Stage 2 of the Norman Esch Awards, validating the venture’s impact and potential"
      ]
    },
    "ShieldMate INC.": {
      jobTitle: "Research Analyst @",
      duration: "MAR 2023 - DEC 2023",
      desc: [
        "Utilized analytical skills to conduct in-depth market research, identify key market needs and trends to inform the development process for the innovative startup that aims to address the underreporting of IPV",
        "Led the conceptualization and wireframing for the envisioned platform using Figma to guide app development and ensure maximum user satisfaction",
        "Collaborated with various stakeholders and firms to forge strategic partnerships to amplify the app's reach and impact"
      ]
    },
    HealthMate: {
      jobTitle: "Technical Lead @",
      duration: "SEP 2022 - FEB 2023",
      desc: [
        "Developed a Node.js smart home system through Facebook’s Messenger integrated with Bocco sensors and other smart devices (Nest camera, TPLink smart plugs) to derive conclusions about the current state of the homeLed prototyping and product development, using Bubble.io for a no-code platform and guiding the team through technical decisions",
        "Designed UI/UX assets in Figma and Adobe Illustrator to deliver a functional and user-friendly health tech interface"
      ]
    },
        "Fiverr": {
      jobTitle: "Graphic Designer @",
      duration: "SEP 2022 - DEC 2023",
      desc: [
        "Collaborated with clients to understand their target audience and develop designs that effectively conveyed the desired sentiment, resulting in increased product sales and customer satisfaction",
        "Leveraged graphic design skills and creativity to produce unique and compelling designs for global clients that stood out in the competitive Print-on-Demand market",
        "Effectively managed client expectations, deadlines, and project requirements, demonstrating strong communication and time management skills"
      ]
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={!isHorizontal ? "vertical" : null}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={isHorizontal ? `0${i}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeInSection key={i} delay={`${i + 1}00ms`}>
                  <li>{descItem}</li>
                </FadeInSection>
              );
            })}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
