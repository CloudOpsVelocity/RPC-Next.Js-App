const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
// Replace with your actual base URL

const data = [
  {
    label: "My Profile",
    url: `${baseUrl}/my-profile`,
  },
  {
    label: "Post Project",
    url: `${baseUrl}/project/postProject`,
  },
  {
    label: "Post Listing",
    url: `${baseUrl}/property/v1/post`,
  },
  {
    label: "About Us",
    url: `${baseUrl}/about-us`,
  },
];
export const unAuthorizedData = [
  {
    label: "Login",
    url: `https://test.getrightproperty.com/login`,
  },
  {
    label: "Sign Up",
    url: `https://test.getrightproperty.com/register`,
  },
];
export default data;
