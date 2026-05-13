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

const DISPLAY_FONT = "'Josefin Sans', 'Inter', sans-serif";
const BODY_FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";
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
  switch (name) {
    case "E-mail":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 11.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.25V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z" />
        </svg>
      );
    case "Github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.25.77-.55v-2c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.12 1.15a10.83 10.83 0 015.68 0c2.17-1.45 3.12-1.15 3.12-1.15.61 1.54.23 2.69.11 2.97.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.27-5.15 5.55.4.34.76 1.02.76 2.05v3.03c0 .3.21.66.78.55 4.47-1.49 7.69-5.7 7.69-10.67C23.25 5.48 18.27.5 12 .5z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2H21l-6.56 7.5L22.5 22h-6.25l-4.89-6.39L5.5 22H2.74l7.02-8.02L1.5 2h6.41l4.41 5.83L18.24 2zm-1.1 18h1.74L7.02 4H5.2l11.95 16z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
  }
};

const contactLabel = (c: { name: string; url: string }) => {
  if (c.url.startsWith("mailto:")) return c.url.replace("mailto:", "");
  if (c.name === "LinkedIn") return "dmtrkovalenko";
  if (c.name === "Github") return "dmtrKovalenko";
  if (c.name === "Twitter") return "@neogoose_btw";
  return c.url.replace(/^https?:\/\//, "");
};

const PAGE_BREAK_AFTER = 4;

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
        <button
          className={clsx(styles.printButton, "no-print")}
          onClick={() => typeof window !== "undefined" && window.print()}
          type="button"
        >
          Print / Save PDF
        </button>
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
          <div className={styles.titleBarText}>Senior Software Engineer</div>
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
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
                      </svg>
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
                <div className={styles.langRow}>
                  <span className={styles.langLabel}>English</span>
                  <span>Advanced · C1</span>
                </div>
                <div className={styles.langRow}>
                  <span className={styles.langLabel}>German</span>
                  <span>Intermediate · B1</span>
                </div>
                <div className={styles.langRow}>
                  <span className={styles.langLabel}>Ukrainian</span>
                  <span>Native · C2</span>
                </div>
                <div className={styles.langRow}>
                  <span className={styles.langLabel}>Russian</span>
                  <span>Native · C2</span>
                </div>
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
                      idx >= PAGE_BREAK_AFTER && styles.hiddenInPrint
                    )}
                  />
                ))}
              </section>
            </div>
          </div>

          {visibleJobs.length > PAGE_BREAK_AFTER && (
            <div className={styles.printOnlyContinuation}>
              <div className={styles.printPageHeader}>
                <h1 className={styles.printPageName}>Dmitriy Kovalenko</h1>
                <div className={styles.printPageTitleBar}>
                  Senior Software Engineer
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
                  {visibleJobs.slice(PAGE_BREAK_AFTER).map((employment) => (
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
