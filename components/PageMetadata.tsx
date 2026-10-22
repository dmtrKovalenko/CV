import Head from "next/head";
import { profile } from "../utils/profile";

const homeTitle = `${profile.name} | Software Engineer & Open-Source Developer`;
const pages: Record<
  string,
  { title: string; description: string; canonicalPath: string }
> = {
  "/": {
    title: homeTitle,
    description: profile.description,
    canonicalPath: "/",
  },
  "/forHrs": {
    title: `${profile.name} | Skills & Experience`,
    description:
      "Dmitriy Kovalenko's technical skills and resume, covering systems programming, web development and open-source software.",
    canonicalPath: "/forHrs",
  },
  "/resume": {
    title: `${profile.name} | Resume`,
    description:
      "Dmitriy Kovalenko's resume: software engineering experience, technical skills and open-source projects.",
    canonicalPath: "/resume",
  },
  "/resumeFullCv": {
    title: `${profile.name} | Full CV`,
    description:
      "Dmitriy Kovalenko's full CV, including work history, project details, technical skills and open-source contributions.",
    canonicalPath: "/resumeFullCv",
  },
};

pages["/resumeNoPhoto"] = pages["/resume"];
pages["/resumeFullCvNoPhoto"] = pages["/resumeFullCv"];

export function PageMetadata({ pathname }: { pathname: string }) {
  const page = pages[pathname];
  const title = page?.title ?? profile.name;
  const description = page?.description ?? profile.description;
  const canonicalUrl = page
    ? new URL(page.canonicalPath, profile.url).href
    : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={profile.name} />
      <meta
        name="robots"
        content={page ? "index,follow,max-image-preview:large" : "noindex"}
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content={pathname === "/" ? "profile" : "website"} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={profile.socialImage} />
      <meta property="og:image:alt" content="Portrait of Dmitriy Kovalenko" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="1067" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@neogoose_btw" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={profile.socialImage} />
      <meta name="twitter:image:alt" content="Portrait of Dmitriy Kovalenko" />
    </Head>
  );
}
