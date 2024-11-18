const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
// Replace with your actual base URL

const data = [
  {
    label: "My Profile",
    url: `${baseUrl}/your-profile#step_B`,
  },
  {
    label: "Dashboard",
    url: `${baseUrl}/your-profile`,
  },
  {
    label: "Post Project",
    url: `${baseUrl}/post-your-project`,
  },
  {
    label: "Post Listing",
    url: `${baseUrl}/post-your-listing`,
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
