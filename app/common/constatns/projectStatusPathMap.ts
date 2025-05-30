export const STATIC_PROJECT_PATH_MAPPINGS: Record<string, string> = {
  "/residential/projects/bengaluru/new-launch": "9*CT_108*PS",
  "/residential/projects/bengaluru/ready-to-move": "9*CT_107*PS",
  "/residential/projects/bengaluru/on-going": "9*CT_106*PS",
};

export const projectStatusMap = new Map<
  string,
  { code: string; title: string }
>([
  ["new-launch", { code: "9*CT_108*PS", title: "New Launch" }],
  ["ready-to-move", { code: "9*CT_107*PS", title: "Ready to Move" }],
  ["on-going", { code: "9*CT_106*PS", title: "On Going" }],
]);
