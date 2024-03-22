import { Page, BoldTypography } from "../components/Common";
import Head from "next/head";
import { Typography } from "@material-ui/core";
import { ResumePreview } from "../components/ResumePreview";

export default function Tailwind() {
  return (
    <Page style={{ maxWidth: 1280, margin: "0 auto" }}>
      <Head>
        <title> Tailwind 🫣</title>
      </Head>

      <BoldTypography
        component="h1"
        variant="h3"
        gutterBottom
        style={{ marginTop: "1rem" }}
      >
        Welcome, dear Tailwind folks!
      </BoldTypography>

      <Typography variant="body1" paragraph>
        My name is Dmitriy and this is my personal website, which I built using
        Material-UI long time ago when I was a{" "}
        <a href="https://mui.com/about/">core contributor</a>. To be honest, it
        is a true torture to write this page without Tailwind right now.
        <br /> I am <strong>a true fan</strong> of your work, use tailwind
        everywhere and would really love to help you ship 🚀 something truly
        amazing!
      </Typography>

      <BoldTypography component="h2" variant="h4" gutterBottom>
        Why me?
      </BoldTypography>

      <Typography variant="body1">
        <ul>
          <li>
            <BoldTypography component="h3" variant="h5">
              I know Rust
            </BoldTypography>
            <Typography variant="body1" paragraph>
              I've been a Rustacean for a while. Currently, I'm working as a
              full- time Rust (and, of course, frontend with Tailwind) developer
              building with Rust. Besides that, I have a few Rust projects on my
              <a href="https://github.com/dmtrKovalenko/"> GitHub</a> and am
              actively working{" "}
              <a href="https://fframes.studio">on a big Rust framework</a>{" "}
              (landing and devtools websites of fframes are using tailwind btw).
            </Typography>
          </li>

          <li>
            <BoldTypography component="h3" variant="h5">
              I know how to make things fast
            </BoldTypography>
            <Typography variant="body1" paragraph>
              Another one of my projects is{" "}
              <a href="https://github.com/dmtrKovalenko/odiff">ODiff</a>, which
              is the fastest diffing tool for images and is used by many visual
              regression services now. I built it because I wanted to make
              visual regression tests faster, and I did (yes, I'm really proud
              of it 🫣). Also, I spend a lot of time optimizing video rendering
              and encoding, even committed a few patches to libav (the ffmpeg
              backend) which is a pure C and assembly codebase.
              <br />
              And overall, <strong>I truly love</strong> responsive, fast, and
              GPU-accelerated UIs so I usually spend tons of time polishing and
              optimizing my UIs (it's sometimes hard to do in startups though).
            </Typography>
          </li>

          <li>
            <BoldTypography component="h3" variant="h5">
              I've built frontend dev tools
            </BoldTypography>
            <Typography variant="body1" paragraph>
              When I was working on{" "}
              <a href="https://www.cypress.io/">cypress.io</a>, we built a bunch
              of devtools, specifically dev server integrations with next.js,
              Vite, and webpack. So, I already have some experience integrating
              with existing frontend environments. And overall building devtools
              is one of my biggest passions, so I hope I know how to make
              developers happy.
            </Typography>
          </li>

          <li>
            <BoldTypography component="h3" variant="h5">
              I know what it takes to make things amazing
            </BoldTypography>

            <Typography variant="body1">
              I understand how hard it is to create something that's genuinely
              useful, fast, helpful, and reliable all at once. That's why I
              respect Tailwind and all the work you folks are doing to make web
              development much easier. I hope I can help you make it even
              better.
            </Typography>
          </li>
        </ul>
      </Typography>

      <BoldTypography component="h2" variant="h4" paragraph>
        Let's have a chat?
      </BoldTypography>

      <Typography gutterBottom variant="body1">
        I already have a ton of ideas on how we can make tailwind much better.
        Quick example: I recently had some issues with changing of the generated
        classnames order, I think it should be easy to make the order of classes
        guaranteed by tailwind so we don't have to worry about things{" "}
        <a href="https://github.com/tailwindlabs/tailwindcss/issues/10603#issuecomment-1433743390">
          like this
        </a>
        .
      </Typography>

      <Typography variant="body1">
        Here is my resume, and I will wait for your response just like I was
        waiting for the Hogwarts letter when I was eleven!
      </Typography>
      <Typography variant="body1" style={{ color: "#cbd5e1" }}>
        P.S. You should try clicking the "Download" button below!
      </Typography>
      <br />

      <ResumePreview align="start" />
    </Page>
  );
}
