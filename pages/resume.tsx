import * as React from "react";
import ExportedImage from "next-image-export-optimizer";
import blue from "@material-ui/core/colors/blue";
import resume from "../content/resume.json";
import skills from "../content/skills.json";
import contacts from "../content/contacts.json";
import { MuiThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { getResumeIcon } from "../utils/resumeIcons";
import { contactLabel, RESUME_PAGE_BREAK_AFTER, resumeLanguages } from "../utils/resume";

const EMOJI_STACK =
  "EmojiFallback, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'";
const DISPLAY_FONT = `'Josefin Sans', 'Inter', sans-serif, ${EMOJI_STACK}`;
const BODY_FONT = `'Inter', 'Helvetica Neue', Arial, sans-serif, ${EMOJI_STACK}`;
const INK = "#1a1a1a";
const INK_SOFT = "#3a3a3a";
const MUTED = "#7a7a7a";
const RULE = "#c9c9c9";
const ACCENT = "#1a1a1a";

const useStyles = makeStyles({
  printButton: {
    position: "fixed",
    top: 16,
    right: 16,
    zIndex: 10,
    padding: "10px 18px",
    fontFamily: BODY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: INK,
    color: "white",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    "&:hover": { background: "#000" },
  },
  container: {
    padding: "64px 72px",
    background: "white",
    color: INK,
    margin: "0 auto",
    minHeight: "100vh",
    width: "820px",
    fontFamily: BODY_FONT,
    fontSize: 12.5,
    lineHeight: 1.55,
    "@media print": {
      padding: "18px 0 0 0",
      width: "100%",
      maxWidth: "none",
      minHeight: 0,
      margin: 0,
      fontSize: 10.5,
      lineHeight: 1.45,
    },
  },
  name: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 300,
    fontSize: 44,
    letterSpacing: "0.28em",
    textAlign: "center",
    textTransform: "uppercase",
    margin: 0,
    color: INK,
    "@media print": { fontSize: 32 },
  },
  nameWithPhoto: {
    fontSize: 38,
    "@media print": { fontSize: 32 },
  },
  titleBarWrap: {
    marginTop: 24,
    marginBottom: 40,
    borderTop: `1px solid ${RULE}`,
    borderBottom: `1px solid ${RULE}`,
    textAlign: "center",
    padding: "10px 0",
    "@media print": { marginTop: 14, marginBottom: 22, padding: "7px 0" },
  },
  titleBarText: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 500,
    letterSpacing: "0.3em",
    fontSize: 15,
    textTransform: "uppercase",
    color: INK,
    margin: 0,
  },
  photoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
    "@media print": { display: "none" },
  },
  avatar: {
    borderRadius: "50%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    "@media print": { gap: 18 },
  },
  splitRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    columnGap: 36,
    rowGap: 32,
    position: "relative",
  },
  divider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "calc(33.333% + 6px)",
    width: 1,
    background: RULE,
    pointerEvents: "none",
  },
  fullRow: {
    width: "100%",
  },
  printOnlyContinuation: {
    display: "none",
    "@media print": {
      display: "block",
      breakBefore: "page",
      pageBreakBefore: "always",
      marginBottom: 16,
    },
  },
  hiddenInPrint: {
    "@media print": { display: "none !important" },
  },
  printPageHeader: {
    marginBottom: 18,
    paddingTop: 18,
  },
  printPageName: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 300,
    letterSpacing: "0.28em",
    textAlign: "center",
    textTransform: "uppercase",
    margin: 0,
    color: INK,
    fontSize: 32,
  },
  printPageTitleBar: {
    marginTop: 14,
    marginBottom: 18,
    borderTop: `1px solid ${RULE}`,
    borderBottom: `1px solid ${RULE}`,
    textAlign: "center",
    padding: "7px 0",
    fontFamily: DISPLAY_FONT,
    fontWeight: 500,
    letterSpacing: "0.3em",
    fontSize: 13,
    textTransform: "uppercase",
    color: INK,
  },
  printContinuedHeading: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 400,
    fontSize: 13,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: INK,
    margin: 0,
    marginBottom: 10,
  },
  printContinuedGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    columnGap: 36,
    rowGap: 18,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "calc(33.333% + 6px)",
      width: 1,
      background: RULE,
    },
  },
  section: {
    breakInside: "avoid",
    pageBreakInside: "avoid",
  },
  sectionHeading: {
    fontFamily: DISPLAY_FONT,
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: INK,
    margin: 0,
    marginBottom: 14,
    "@media print": { fontSize: 13, marginBottom: 10, letterSpacing: "0.25em" },
  },
  sectionHeadingWithLink: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  sectionHeadingLink: {
    fontFamily: BODY_FONT,
    fontWeight: 400,
    letterSpacing: "0.02em",
    textTransform: "none",
    fontSize: 11,
    color: MUTED,
    textDecoration: "none",
    "&:hover": { color: INK, textDecoration: "underline" },
  },
  horizontalDivider: {
    gridColumn: "1 / -1",
    height: 1,
    background: RULE,
    margin: "28px 0",
    border: 0,
    "@media print": { margin: "14px 0" },
  },
  contactList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 12,
    color: INK_SOFT,
  },
  contactIcon: {
    width: 14,
    height: 14,
    color: INK,
    flexShrink: 0,
  },
  contactLink: {
    color: INK_SOFT,
    textDecoration: "none",
    wordBreak: "break-word",
    "&:hover": { color: INK, textDecoration: "underline" },
  },
  blockTitle: {
    fontFamily: BODY_FONT,
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: INK,
    margin: 0,
  },
  blockSubtitle: {
    fontSize: 12,
    color: INK_SOFT,
    margin: 0,
  },
  blockMeta: {
    fontSize: 11,
    color: MUTED,
    margin: 0,
  },
  eduEntry: {
    marginBottom: 16,
    "&:last-child": { marginBottom: 0 },
  },
  skillRow: {
    marginBottom: 10,
    "&:last-child": { marginBottom: 0 },
  },
  skillLabel: {
    fontFamily: BODY_FONT,
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: INK,
    marginBottom: 2,
  },
  skillValue: {
    fontSize: 11.5,
    color: INK_SOFT,
    lineHeight: 1.5,
  },
  profileText: {
    fontSize: 12.5,
    color: INK_SOFT,
    whiteSpace: "pre-line",
    margin: 0,
  },
  jobEntry: {
    marginBottom: 36,
    "&:last-child": { marginBottom: 0 },
    breakInside: "avoid",
    pageBreakInside: "avoid",
    "@media print": { marginBottom: 32 },
  },
  jobHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 2,
  },
  jobPosition: {
    fontFamily: BODY_FONT,
    fontWeight: 700,
    fontSize: 12.5,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: INK,
  },
  jobMeta: {
    fontSize: 11,
    color: MUTED,
    whiteSpace: "nowrap",
  },
  jobCompany: {
    fontSize: 12,
    color: INK_SOFT,
    fontWeight: 500,
    marginBottom: 8,
  },
  jobResp: {
    fontSize: 12,
    color: INK_SOFT,
    margin: 0,
  },
  projectList: {
    margin: "8px 0 0 0",
    padding: 0,
    listStyle: "none",
  },
  projectItem: {
    marginBottom: 8,
    paddingLeft: 14,
    position: "relative",
    "&::before": {
      content: '"›"',
      position: "absolute",
      left: 0,
      color: MUTED,
    },
  },
  projectTitle: {
    fontWeight: 600,
    fontSize: 11.5,
    color: INK,
  },
  projectResp: {
    fontSize: 11.5,
    color: INK_SOFT,
  },
  projectStack: {
    fontSize: 11,
    color: MUTED,
    fontStyle: "italic",
  },
  ossGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  ossCard: {
    border: `1px solid ${RULE}`,
    padding: "10px 12px",
    breakInside: "avoid",
    pageBreakInside: "avoid",
  },
  ossHeaderRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 4,
  },
  ossName: {
    fontFamily: BODY_FONT,
    fontWeight: 700,
    fontSize: 12.5,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: INK,
  },
  ossRole: {
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "2px 7px",
    borderRadius: 0,
    whiteSpace: "nowrap",
    border: `1px solid ${INK}`,
  },
  ossRoleAuthor: {
    background: INK,
    color: "white",
  },
  ossRoleContributor: {
    background: "transparent",
    color: INK,
  },
  ossStarChip: {
    fontSize: 10,
    fontWeight: 500,
    color: MUTED,
    marginLeft: "auto",
    whiteSpace: "nowrap",
  },
  ossDescription: {
    fontSize: 11,
    color: INK_SOFT,
    lineHeight: 1.4,
    marginBottom: 6,
  },
  ossFooterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
  },
  ossTechRow: {
    fontSize: 10,
    color: MUTED,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  ossUrl: {
    fontSize: 10,
    color: ACCENT,
    textDecoration: "none",
    wordBreak: "break-all",
    "&:hover": { textDecoration: "underline" },
  },
  langRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11.5,
    color: INK_SOFT,
    marginBottom: 4,
  },
  langLabel: {
    fontWeight: 600,
    color: INK,
  },
});

const resumeMuiTheme = createTheme({
  palette: { type: "light", primary: blue },
  typography: { fontFamily: BODY_FONT },
});

const contactIcon = (name: string) => {
  const icon = getResumeIcon(name);
  return (
    <svg
      viewBox="0 0 24 24"
      fill={icon.paint === "fill" ? "currentColor" : "none"}
      stroke={icon.paint === "stroke" ? "currentColor" : undefined}
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
};

type Employment = (typeof resume.employment)[number];

const JobEntry: React.FC<{
  employment: Employment;
  styles: ReturnType<typeof useStyles>;
  renderFullCV: boolean;
  className?: string;
}> = ({ employment, styles, renderFullCV, className }) => (
  <div className={clsx(styles.jobEntry, className)}>
    <div className={styles.jobHeader}>
      <span className={styles.jobPosition}>{employment.position}</span>
      <span className={styles.jobMeta}>{employment.when}</span>
    </div>
    <div className={styles.jobCompany}>{employment.company}</div>
    <p className={styles.jobResp}>{employment.responsibilities}</p>

    {renderFullCV &&
      (
        employment as Employment & {
          projects?: Array<{
            idea: string;
            responsibilities: string;
            stack?: string[];
          }>;
        }
      ).projects && (
        <ul className={styles.projectList}>
          {(
            employment as Employment & {
              projects: Array<{
                idea: string;
                responsibilities: string;
                stack?: string[];
              }>;
            }
          ).projects.map((project) => (
            <li key={project.idea} className={styles.projectItem}>
              <span className={styles.projectTitle}>{project.idea}.</span>{" "}
              <span className={styles.projectResp}>
                {project.responsibilities}
              </span>
              {project.stack && (
                <div className={styles.projectStack}>
                  {project.stack.join(" · ")}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
  </div>
);

const Resume = ({
  renderFullCV = false,
  hidePhoto = false,
  preview = false,
  className,
}: {
  className?: string;
  renderFullCV?: boolean;
  hidePhoto?: boolean;
  preview?: boolean;
}) => {
  const styles = useStyles();

  const visibleJobs = resume.employment.filter(
    (employment) =>
      renderFullCV || !(employment as { showOnlyOnCV?: boolean }).showOnlyOnCV,
  );

  return (
    <MuiThemeProvider theme={resumeMuiTheme}>
      {!preview && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @page { size: A4; margin: 10mm; }
              html { background: #fff !important; color-scheme: light !important; }
              body { background: #fff !important; color: ${INK}; }
              * { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
              @media print {
                .no-print { display: none !important; }
                html, body { margin: 0; padding: 0; background: #fff !important; }
              }
            `,
          }}
        />
      )}
      {!preview && (
        <a
          className={clsx(styles.printButton, "no-print")}
          href={`/api/renderResume?variant=${renderFullCV ? "full" : "resume"}`}
          download
        >
          Download PDF
        </a>
      )}
      <div className={clsx(styles.container, className)}>
        {!hidePhoto && (
          <div className={styles.photoWrap}>
            <ExportedImage
              alt="Dmitriy Kovalenko"
              src="/img/Photo2.jpg"
              height={140}
              width={140}
              className={styles.avatar}
            />
          </div>
        )}

        <h1 className={clsx(styles.name, !hidePhoto && styles.nameWithPhoto)}>
          Dmitriy Kovalenko
        </h1>

        <div className={styles.titleBarWrap}>
          <div className={styles.titleBarText}>{resume.employment[0].position}</div>
        </div>

        <div className={styles.body}>
          <div className={styles.splitRow}>
            <div className={styles.divider} />

            <div>
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Contact</h2>
                <ul className={styles.contactList}>
                  {contacts.map((c) => (
                    <li key={c.name} className={styles.contactItem}>
                      <span className={styles.contactIcon}>
                        {contactIcon(c.name)}
                      </span>
                      <a className={styles.contactLink} href={c.url}>
                        {contactLabel(c)}
                      </a>
                    </li>
                  ))}
                  <li className={styles.contactItem}>
                    <span className={styles.contactIcon}>
                      {contactIcon("Website")}
                    </span>
                    <a
                      className={styles.contactLink}
                      href="https://dmtrkovalenko.dev"
                    >
                      dmtrkovalenko.dev
                    </a>
                  </li>
                </ul>
              </section>

              <hr className={styles.horizontalDivider} />

              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Skills</h2>
                {(Object.keys(skills) as Array<keyof typeof skills>).map(
                  (area) => (
                    <div key={area} className={styles.skillRow}>
                      <div className={styles.skillLabel}>{area}</div>
                      <div className={styles.skillValue}>
                        {skills[area].join(", ")}
                      </div>
                    </div>
                  ),
                )}
              </section>

              <hr className={styles.horizontalDivider} />

              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Languages</h2>
                {resumeLanguages.map(language => (
                  <div className={styles.langRow} key={language.name}>
                    <span className={styles.langLabel}>{language.name}</span>
                    <span>{language.level}</span>
                  </div>
                ))}
              </section>

              <hr
                className={clsx(styles.horizontalDivider, styles.hiddenInPrint)}
              />

              <section className={clsx(styles.section, styles.hiddenInPrint)}>
                <h2 className={styles.sectionHeading}>Education</h2>
                {resume.education.map((e) => (
                  <div key={e.place} className={styles.eduEntry}>
                    <div className={styles.blockTitle}>{e.position}</div>
                    <div className={styles.blockSubtitle}>{e.place}</div>
                    <div className={styles.blockMeta}>{e.when}</div>
                  </div>
                ))}
              </section>
            </div>

            <div>
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Profile</h2>
                <p className={styles.profileText}>{resume.summary}</p>
              </section>

              <hr className={styles.horizontalDivider} />

              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Work Experience</h2>

                {visibleJobs.map((employment, idx) => (
                  <JobEntry
                    key={employment.company + employment.when}
                    employment={employment}
                    styles={styles}
                    renderFullCV={renderFullCV}
                    className={clsx(
                      idx >= RESUME_PAGE_BREAK_AFTER && styles.hiddenInPrint
                    )}
                  />
                ))}
              </section>
            </div>
          </div>

          {visibleJobs.length > RESUME_PAGE_BREAK_AFTER && (
            <div className={styles.printOnlyContinuation}>
              <div className={styles.printPageHeader}>
                <h1 className={styles.printPageName}>Dmitriy Kovalenko</h1>
                <div className={styles.printPageTitleBar}>
                  {resume.employment[0].position}
                </div>
              </div>

              <div className={styles.printContinuedGrid}>
                <div>
                  <section className={styles.section}>
                    <h2 className={styles.sectionHeading}>Education</h2>
                    {resume.education.map((e) => (
                      <div key={e.place} className={styles.eduEntry}>
                        <div className={styles.blockTitle}>{e.position}</div>
                        <div className={styles.blockSubtitle}>{e.place}</div>
                        <div className={styles.blockMeta}>{e.when}</div>
                      </div>
                    ))}
                  </section>
                </div>

                <div>
                  <h2 className={styles.printContinuedHeading}>
                    Work Experience (continued)
                  </h2>
                  {visibleJobs.slice(RESUME_PAGE_BREAK_AFTER).map((employment) => (
                    <JobEntry
                      key={employment.company + employment.when}
                      employment={employment}
                      styles={styles}
                      renderFullCV={renderFullCV}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <hr className={styles.horizontalDivider} />

          <section className={clsx(styles.section, styles.fullRow)}>
            <div className={styles.sectionHeadingWithLink}>
              <h2 className={styles.sectionHeading} style={{ margin: 0 }}>
                Notable Open Source Work
              </h2>
              <a
                className={styles.sectionHeadingLink}
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
                          : styles.ossRoleContributor,
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
                      {p.tech.join(" · ")}
                    </div>
                    <a className={styles.ossUrl} href={p.url}>
                      {p.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Resume;
