const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
// Replace with your actual base URL

const data = [
  {
    label: "My Profile",
    url: `${baseUrl}/my-profile#step_B`,
  },
  {
    label: "Dashboard",
    url: `${baseUrl}/my-profile`,
  },
  {
    label: "Post Project",
    url: `${baseUrl}/post-project/postProject`,
  },
  {
    label: "Post Listing",
    url: `${baseUrl}/post-listing/v1/post`,
  },
  {
    label: "About Us",
    url: `${baseUrl}/about-us`,
  },
];
export const unAuthorizedData = [
  {
    label: "Login",
    url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/login`,
  },
  {
    label: "Sign Up",
    url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/register`,
  },
];
export default data;
