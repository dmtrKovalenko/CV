import * as React from "react";
import ExportedImage from "next-image-export-optimizer";
import blue from "@material-ui/core/colors/blue";
import resume from "../content/resume.json";
import skills from "../content/skills.json";
import contacts from "../content/contacts.json";
import { MuiThemeProvider } from "@material-ui/core";
import { Typography, Grid, makeStyles, styled } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { Title } from "../components/Common";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    padding: 40,
    background: "white",
    color: "#111",
    margin: "0 auto",
    minHeight: "100vh",
    width: "820px",
  },
  avatar: {
    borderRadius: "50%",
    marginBottom: 16,
  },
  notBold: {
    fontWeight: "normal",
  },
  headerNoPhoto: {
    borderBottom: "2px solid #111",
    paddingBottom: 16,
    marginBottom: 8,
  },
  name: {
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  nameNoPhoto: {
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  tagline: {
    color: "#555",
  },
  contactsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0 16px",
    color: "#333",
    fontSize: 14,
    marginTop: 8,
    fontFamily: "roboto, sans-serif",
  },
  contactLink: {
    color: "#0b5fff",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
  ossGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 8,
  },
  ossCard: {
    border: "1px solid #e3e3e3",
    borderRadius: 8,
    padding: "10px 12px",
    background: "#fafafa",
    breakInside: "avoid",
    pageBreakInside: "avoid",
  },
  ossHeaderRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  ossName: {
    fontWeight: 700,
    fontSize: 15,
    color: "#111",
    marginRight: 2,
  },
  ossRole: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: "2px 7px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },
  ossRoleAuthor: {
    background: "#0b5fff",
    color: "white",
  },
  ossRoleContributor: {
    background: "#eef2ff",
    color: "#0b5fff",
  },
  ossStarChip: {
    fontSize: 10,
    fontWeight: 600,
    fontFamily: "roboto, sans-serif",
    color: "#6b5200",
    background: "#fff7d6",
    border: "1px solid #f0d97a",
    padding: "2px 7px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    whiteSpace: "nowrap",
  },
  ossDescription: {
    fontFamily: "roboto, sans-serif",
    fontSize: 12.5,
    color: "#222",
    marginTop: 6,
    lineHeight: 1.4,
  },
  ossFooterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  ossTechRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
  },
  ossTechChip: {
    fontSize: 10.5,
    fontFamily: "roboto, sans-serif",
    color: "#555",
    background: "#fff",
    border: "1px solid #ddd",
    padding: "1px 6px",
    borderRadius: 4,
  },
  ossUrl: {
    fontFamily: "roboto, sans-serif",
    fontSize: 10.5,
    color: "#0b5fff",
    textDecoration: "none",
    wordBreak: "break-all",
  },
  sectionHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 4,
    gap: 12,
  },
  sectionHeaderTitle: {
    fontWeight: "bold",
    margin: 0,
  },
  sectionHeaderLink: {
    fontFamily: "roboto, sans-serif",
    fontSize: 13,
    color: "#0b5fff",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
});

const Link = styled("a")({
  color: "#0b5fff",
});

const RegularTypography = styled(Typography)({
  fontFamily: "roboto, sans-serif",
  fontWeight: "normal",
});

const renderSkills = (key: keyof typeof skills) => skills[key].join(", ");
const resumeMuiTheme = createTheme({
  palette: {
    type: "light",
    primary: blue,
  },
  typography: {
    fontFamily:
      "GT Walsheim Pro, Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif",

    fontWeightMedium: "normal",
    body1: {
      fontSize: 17,
    },
    body2: {
      fontSize: 15,
    },
    h5: {
      fontWeight: "bold",
    },
  },
});

const Resume = ({
  renderFullCV = false,
  hidePhoto = false,
  className,
}: {
  className?: string;
  renderFullCV?: boolean;
  hidePhoto?: boolean;
}) => {
  const styles = useStyles();

  return (
    <MuiThemeProvider theme={resumeMuiTheme}>
      <div className={clsx(styles.container, className)}>
        {hidePhoto ? (
          <div className={styles.headerNoPhoto}>
            <Typography className={styles.nameNoPhoto} variant="h3">
              Dmitriy Kovalenko
            </Typography>
            <RegularTypography className={styles.tagline} variant="h6">
              Senior Software Engineer · Open-Source Author
            </RegularTypography>
            <div className={styles.contactsRow}>
              {contacts.map((c) => (
                <a key={c.name} className={styles.contactLink} href={c.url}>
                  {c.name}
                </a>
              ))}
              <Link
                className={styles.contactLink}
                href="https://dmtrkovalenko.dev"
              >
                dmtrkovalenko.dev
              </Link>
            </div>
          </div>
        ) : (
          <Grid container>
            <Grid item xs={12} container justifyContent="center">
              <ExportedImage
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
              justifyContent="center"
            >
              <Typography className={styles.name} variant="h3">
                Dmitriy Kovalenko
              </Typography>
              <RegularTypography className={styles.tagline} variant="h6">
                Senior Software Engineer · Open-Source Author
              </RegularTypography>
              <div
                className={styles.contactsRow}
                style={{ justifyContent: "center" }}
              >
                {contacts.map((c) => (
                  <a key={c.name} className={styles.contactLink} href={c.url}>
                    {c.name}
                  </a>
                ))}
                <Link
                  className={styles.contactLink}
                  href="https://dmtrkovalenko.dev"
                >
                  dmtrkovalenko.dev
                </Link>
              </div>
            </Grid>
          </Grid>
        )}

        <Title variant="h5" gutterBottom>
          Summary
        </Title>
        <RegularTypography style={{ whiteSpace: "pre-line" }} gutterBottom>
          {resume.summary}
        </RegularTypography>

        <div className={styles.sectionHeaderRow}>
          <Typography className={styles.sectionHeaderTitle} variant="h5">
            Open-Source Work
          </Typography>
          <a
            className={styles.sectionHeaderLink}
            href="https://github.com/dmtrKovalenko"
          >
            github.com/dmtrKovalenko →
          </a>
        </div>
        <div className={styles.ossGrid}>
          {resume.ossProjects.map((p) => (
            <div key={p.name} className={styles.ossCard}>
              <div className={styles.ossHeaderRow}>
                <span className={styles.ossName}>{p.name}</span>
                <span
                  className={clsx(
                    styles.ossRole,
                    p.role === "Author"
                      ? styles.ossRoleAuthor
                      : styles.ossRoleContributor
                  )}
                >
                  {p.role}
                </span>
                {p.stars && (
                  <span className={styles.ossStarChip}>★ {p.stars}</span>
                )}
              </div>
              <div className={styles.ossDescription}>{p.description}</div>
              <div className={styles.ossFooterRow}>
                <div className={styles.ossTechRow}>
                  {p.tech.map((t) => (
                    <span key={t} className={styles.ossTechChip}>
                      {t}
                    </span>
                  ))}
                </div>
                <a className={styles.ossUrl} href={p.url}>
                  {p.url.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </div>
            </div>
          ))}
        </div>

        <Title variant="h5" gutterBottom>
          Technical Skills
        </Title>
        {Object.keys(skills).map((area) => (
          <Typography key={area}>
            <b>{area}: </b>{" "}
            <span style={{ fontFamily: "roboto, sans-serif" }}>
              {renderSkills(area as keyof typeof skills)}
            </span>
          </Typography>
        ))}

        <Title variant="h5" gutterBottom>
          Work Experience
        </Title>

        {resume.employment
          .filter(
            (employment) =>
              renderFullCV ||
              !(employment as { showOnlyOnCV?: boolean }).showOnlyOnCV
          )
          .map((employment) => (
            <React.Fragment key={employment.company + employment.when}>
              <Typography variant="body1">
                <b>{employment.position}</b> · {employment.company} ·{" "}
                <span className={styles.notBold}>{employment.when}</span>
              </Typography>
              <RegularTypography gutterBottom variant="body2">
                {employment.responsibilities}
              </RegularTypography>

              {renderFullCV && employment.projects && (
                <ul>
                  {employment.projects.map((project) => (
                    <li key={project.idea}>
                      <Typography variant="subtitle2">
                        {project.idea}
                      </Typography>
                      <RegularTypography variant="body2" gutterBottom>
                        {project.responsibilities}
                      </RegularTypography>

                      <RegularTypography variant="subtitle2" gutterBottom>
                        Stack:{" "}
                        <span className={styles.notBold}>
                          {project.stack?.join(", ")}
                        </span>
                      </RegularTypography>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}

        <Title variant="h5" gutterBottom>
          Languages
        </Title>
        <RegularTypography variant="subtitle1">
          English — Advanced (C1)
        </RegularTypography>
        <RegularTypography variant="subtitle1">
          German — Intermediate (B1)
        </RegularTypography>
        <RegularTypography variant="subtitle1">
          Ukrainian &amp; Russian — Native (C2)
        </RegularTypography>

        <Title variant="h5" gutterBottom>
          Education
        </Title>

        {resume.education.map((education) => (
          <React.Fragment key={education.place}>
            <Typography variant="body1">{education.place}</Typography>
            <RegularTypography gutterBottom variant="body2">
              {education.position} · {education.when}
            </RegularTypography>
          </React.Fragment>
        ))}
      </div>
    </MuiThemeProvider>
  );
};

export default Resume;
