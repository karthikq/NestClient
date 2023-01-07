/** @format */

export const backendUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://testingnestjs2.onrender.com";
  } else {
    return "http://localhost:5000";
  }
};
