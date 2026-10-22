import contacts from "../content/contacts.json";

export const profile = {
  name: "Dmitriy Kovalenko",
  alternateName: ["Dmitry Kovalenko", "dmtrKovalenko", "neogoose_btw"],
  url: "https://dmtrkovalenko.dev/",
  jobTitle: "Software Engineer",
  description:
    "Dmitriy Kovalenko is a software engineer, open-source developer and creator of fff, odiff and fframes. He speaks about software performance and systems programming.",
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
