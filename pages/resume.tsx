import * as React from "react";
import blue from "@material-ui/core/colors/blue";
import Photo from "../assets/Photo.jpg";
import resume from "../content/resume.json";
import skills from "../content/skills.json";
import { MuiThemeProvider } from "@material-ui/core";
import {
  Typography,
  Grid,
  Avatar,
  makeStyles,
  styled
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Title } from "../components/_shared/Common";

const useStyles = makeStyles({
  container: {
    padding: 32,
    background: "white",
    color: "black",
    margin: "0 auto",
    minHeight: "100vh",
    width: "800px"
  },
  avatar: {
    width: 180,
    height: 180,
    marginBottom: 16
  },
  notBold: {
    fontWeight: "normal"
  }
});

const Link = styled("a")({
  color: "blue"
});

const renderSkills = (key: keyof typeof skills) => skills[key].join(", ");
const resumeMuiTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue
  }
});

const Resume = ({ renderFullCV = false }: { renderFullCV?: boolean }) => {
  const styles = useStyles();

  return (
    <MuiThemeProvider theme={resumeMuiTheme}>
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} container justify="center">
            <Avatar alt="My photo" src={Photo} className={styles.avatar} />
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="h4">Dmitriy Kovalenko</Typography>
            <Typography variant="h6" gutterBottom>
              JavaScript engineer
            </Typography>
          </Grid>
        </Grid>

        <Typography align="center">
          Check out my online CV{" "}
          <Link href="https://dmtrkovalenko.dev">
            https://dmtrkovalenko.dev
          </Link>
        </Typography>

        <Title variant="h5" gutterBottom>
          Summary
        </Title>
        <Typography gutterBottom>{resume.summary}</Typography>

        <Title variant="h5" gutterBottom>
          Technical skills
        </Title>
        {Object.keys(skills).map(area => (
          <div key={area}>
            <b>{area}: </b> {renderSkills(area as keyof typeof skills)}
          </div>
        ))}

        <Title variant="h5" gutterBottom>
          Work experience
        </Title>

        {resume.employment
          .filter(employment => renderFullCV || !employment.showOnlyOnCV)
          .map(employment => (
            <React.Fragment key={employment.company}>
              <Typography variant="subtitle1">
                <b>{employment.company}</b>, {employment.when}
              </Typography>
              <Typography gutterBottom variant="body2">
                {employment.responsibilities}
              </Typography>

              <ul>
                {renderFullCV &&
                  employment.projects.map(project => (
                    <li key={project.idea}>
                      <Typography variant="subtitle2">
                        {project.idea}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {project.responsibilities}
                      </Typography>

                      <Typography variant="subtitle2" gutterBottom>
                        Stack:{" "}
                        <span className={styles.notBold}>
                          {project.stack.join(", ")}
                        </span>
                      </Typography>
                    </li>
                  ))}
              </ul>
            </React.Fragment>
          ))}

        <Title variant="h5" gutterBottom>
          Languages
        </Title>
        <Typography variant="subtitle1">
          English - Upper Intermediate
        </Typography>

        <Title variant="h5" gutterBottom>
          Education
        </Title>

        {resume.education.map(education => (
          <React.Fragment key={education.place}>
            <Typography variant="subtitle1">{education.place}</Typography>
            <Typography gutterBottom variant="body2">
              {education.position}, {education.when}
            </Typography>
          </React.Fragment>
        ))}
      </div>
    </MuiThemeProvider>
  );
};

export default Resume;
