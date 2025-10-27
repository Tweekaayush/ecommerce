const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "/api/v1";

export default BASE_URL;
