/**
 * Maps dashboard role display names to the role values used in data/flashcards.json.
 * Use this to filter questions by selected roles.
 */
export const roleMap: Record<string, string> = {
  "Frontend Developer": "frontend",
  "Backend Developer": "backend",
  "Full Stack Developer": "fullstack",
  "Devops Engineer": "devops",
  "UX/UI Designer": "ui/ux designer",
  "Scrum Master": "scrum master",
  "Python Developer": "python developer",
  "Product Designer": "designer",
  "Web Developer": "web developer",
};

export const allRoles = Object.keys(roleMap);

/** Map selected role display names to JSON role values for filtering flashcards. */
export function getRoleValuesForFilter(selectedRoles: Set<string>): string[] {
  return [...selectedRoles].map((name) => roleMap[name]).filter(Boolean);
}
