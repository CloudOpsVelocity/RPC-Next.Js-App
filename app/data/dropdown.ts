const baseUrl = process.env.NEXTAUTH_URL;
// Replace with your actual base URL

const data = [
  {
    label: "My Profile",
    url: `${baseUrl}/your-profile/personal-info`,
    svg: "user-profile",
  },
  {
    label: "Dashboard",
    url: `${baseUrl}/your-profile/dashboard`,
    svg: "dashboard",
  },
  {
    label: "Post Project",
    url: `${baseUrl}/post-your-project`,
    svg: "post-project",
  },
  {
    label: "Post Listing",
    url: `${baseUrl}/post-your-listing`,
    svg: "post-listing",
  },
  {
    label: "Shortlist",
    url: `${baseUrl}/your-profile/shortlisted`,
    svg: "shortlist",
  },
  {
    label: "Compare",
    url: `${baseUrl}/your-profile/compare`,
    svg: "compare",
  },
  {
    label: "Q&A",
    url: `${baseUrl}/your-profile/question-and-answers`,
    svg: "qna",
  },
];
export const unAuthorizedData = [
  {
    label: "Login",
    url: `${baseUrl}/login`,
  },
  {
    label: "Sign Up",
    url: `${baseUrl}/register`,
  },
];

export default data;
