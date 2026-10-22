export const RESUME_PAGE_BREAK_AFTER = 4;

export const resumeLanguages = [
  { name: "English", level: "Advanced · C1" },
  { name: "German", level: "Intermediate · B1" },
  { name: "Ukrainian", level: "Native · C2" },
  { name: "Russian", level: "Native · C2" },
];

export function contactLabel(contact: { name: string; url: string }) {
  if (contact.url.startsWith("mailto:")) return contact.url.replace("mailto:", "");
  if (contact.name === "LinkedIn") return "dmtrkovalenko";
  if (contact.name === "Github") return "dmtrKovalenko";
  if (contact.name === "Twitter") return "@neogoose_btw";
  return contact.url.replace(/^https?:\/\//, "");
}
