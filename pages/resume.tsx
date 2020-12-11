import * as React from "react";
import Image from "next/image";
import blue from "@material-ui/core/colors/blue";
import resume from "../content/resume.json";
import skills from "../content/skills.json";
import { MuiThemeProvider } from "@material-ui/core";
import { Typography, Grid, makeStyles, styled } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Title } from "../components/Common";

const useStyles = makeStyles({
  container: {
    padding: 32,
    borderRadius: 8,
    background: "white",
    color: "black",
    margin: "0 auto",
    minHeight: "100vh",
    width: "800px",
  },
  avatar: {
    borderRadius: '50%',
    marginBottom: 16,
  },
  notBold: {
    fontWeight: "normal",
  },
});

const Link = styled("a")({
  color: "blue",
});

const renderSkills = (key: keyof typeof skills) => skills[key].join(", ");
const resumeMuiTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue,
  },
  typography: {
    fontFamily:
      "GT Walsheim Pro, Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif",

    fontWeightMedium: "normal",
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 16,
    },
    h5: {
      fontWeight: "bold",
    },
  },
});

const Resume = ({ renderFullCV = false }: { renderFullCV?: boolean }) => {
  const styles = useStyles();

  return (
    <MuiThemeProvider theme={resumeMuiTheme}>
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} container justify="center">
            <Image
              alt="Dmitriy's photo"
              src="/img/Photo2.jpg"
              height={180}
              width={180}
              className={styles.avatar}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="h3" gutterBottom>
              {" "}
              Dmitriy Kovalenko
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Software engineer
            </Typography>
          </Grid>
        </Grid>

        <Typography paragraph align="center" variant="overline">
          Autogenerated from{" "}
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
        {Object.keys(skills).map((area) => (
          <Typography key={area}>
            <b>{area}: </b> {renderSkills(area as keyof typeof skills)}
          </Typography>
        ))}

        <Title variant="h5" gutterBottom>
          Work experience
        </Title>

        {resume.employment
          .filter((employment) => renderFullCV || !employment.showOnlyOnCV)
          .map((employment) => (
            <React.Fragment key={employment.company}>
              <Typography variant="body1">
                <b>{employment.company}</b>, {employment.when}
              </Typography>
              <Typography gutterBottom variant="body2">
                {employment.responsibilities}
              </Typography>

              <ul>
                {renderFullCV &&
                  employment.projects.map((project) => (
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
          English – Upper Intermediate
        </Typography>
        <Typography variant="subtitle1">Russian & Ukrainian – Native</Typography>

        <Title variant="h5" gutterBottom>
          Education
        </Title>

        {resume.education.map((education) => (
          <React.Fragment key={education.place}>
            <Typography variant="body1">{education.place}</Typography>
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
