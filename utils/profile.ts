import contacts from "../content/contacts.json";

export const profile = {
  name: "Dmitriy Kovalenko",
  alternateName: ["Dmitry Kovalenko", "dmtrKovalenko", "neogoose_btw"],
  url: "https://dmtrkovalenko.dev/",
  jobTitle: "Member of Technical Staff",
  worksFor: {
    "@type": "Organization",
    name: "OpenAI",
    url: "https://openai.com/",
  },
  description:
    "Dmitriy Kovalenko is a Member of Technical Staff at OpenAI, working on the Codex harness. Creator of the open-source projects fff, odiff and fframes.",
  image: "https://dmtrkovalenko.dev/Photo-1x1.jpg",
  socialImage: "https://dmtrkovalenko.dev/Photo-16x9.jpg",
  speakerProfile: "https://gitnation.com/person/dmitriy_kovalenko",
};

export const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${profile.url}#profile`,
  url: profile.url,
  name: profile.name,
  description: profile.description,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    "@id": `${profile.url}#person`,
    name: profile.name,
    alternateName: profile.alternateName,
    url: profile.url,
    jobTitle: profile.jobTitle,
    worksFor: profile.worksFor,
    description: profile.description,
    image: [profile.image, profile.socialImage],
    sameAs: [
      ...contacts
        .filter((contact) => contact.url.startsWith("https://"))
        .map((contact) => contact.url),
      profile.speakerProfile,
    ],
    mainEntityOfPage: { "@id": `${profile.url}#profile` },
  },
};
