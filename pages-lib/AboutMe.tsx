import * as React from "react";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { Page, PageTitle } from "../components/Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles, Typography, Button, useTheme } from "@material-ui/core";
import ReactMarkDown from "react-markdown";
import "katex/dist/katex.min.css";
import AVATAR_URL from "../public/img/Photo-480.jpg"
import aboutMeMd from "../content/about.md";

interface AboutMeProps { }

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: 16,
    width: 300,
    height: 300,
    gridArea: "avatar",
    alignSelf: "center",
    justifySelf: "center",

    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      width: 360,
      height: 360,
    },

    [theme.breakpoints.up("lg")]: {
      width: 480,
      height: 480,
    },

    "& img": {
      borderRadius: '50%'
    },
  },
  text: {
    maxWidth: 600,
    justifySelf: "center",
    gridArea: "about",
  },
  title: {
    gridArea: "title",
  },
  hrBtn: {
    marginTop: 64,
  },
  grid: {
    maxWidth: 1540,
    margin: "0 auto",
    display: "grid",
    gridColumnGap: "64px",
    gridTemplateAreas: `
    "title"
    "avatar"
    "about"
   `,

    [theme.breakpoints.up("md")]: {
      gridTemplateAreas: `
      "title title avatar"
      "about about avatar"
      "about about avatar"
     `,
    },
  },
}));

const currentAge = new Date().getFullYear() - 1997;
const processedAboutText = aboutMeMd.replace(
  "%TOKEN_AGE%",
  currentAge.toString()
);

// Custom inline renderer for paragraphs
const InlineParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Custom component to render markdown with inline LaTeX
const TextWithMath = ({ text }: { text: string }) => {
  const katexModule = require('katex');
  
  // Split by paragraph breaks first
  const paragraphs = text.split(/\n\s*\n/);
  
  return (
    <>
      {paragraphs.map((paragraph, pIndex) => {
        if (!paragraph.trim()) return null;
        
        // Split each paragraph by LaTeX delimiters
        const parts = paragraph.split(/(\\\([^)]*\\\))/gs);
        
        // Check if this paragraph contains LaTeX
        const hasLatex = parts.some(p => p.startsWith('\\(') && p.endsWith('\\)'));
        
        if (hasLatex) {
          // Render as inline content
          return (
            <p key={pIndex}>
              {parts.map((part, index) => {
                if (part.startsWith('\\(') && part.endsWith('\\)')) {
                  const mathContent = part.slice(2, -2);
                  try {
                    const html = katexModule.renderToString(mathContent, { 
                      throwOnError: false,
                      displayMode: false 
                    });
                    return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
                  } catch (e) {
                    console.error('KaTeX rendering error:', e);
                    return <span key={index}>{part}</span>;
                  }
                }
                // Render markdown inline
                if (part.trim()) {
                  return (
                    <ReactMarkDown 
                      key={index} 
                      source={part}
                      renderers={{ paragraph: InlineParagraph }}
                    />
                  );
                }
                return null;
              })}
            </p>
          );
        }
        
        // Regular paragraph without LaTeX
        return <ReactMarkDown key={pIndex} source={paragraph} />;
      })}
    </>
  );
};

export const AboutMe: React.FC<AboutMeProps> = () => {
  const styles = useStyles();

  return (
    <Page>
      <div className={styles.grid}>
        <PageTitle id="about" className={styles.title}>
          About me
        </PageTitle>

        <div className={styles.avatar}>
          <ExportedImage
            className={styles.avatar}
            alt="Dmitriy's Photo at a conference JS Fest 2019"
            src={AVATAR_URL}
            sizes="(min-width: 1025px) 480px,
            300px"
          />
        </div>

        <div className={styles.text}>
          <Typography component="div" gutterBottom>
            <TextWithMath text={processedAboutText} />
          </Typography>

          <Link href="/forHrs">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              style={{ fontWeight: "bold" }}
              endIcon={<ArrowForwardIcon />}
            >
              Let's collaborate
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
};
