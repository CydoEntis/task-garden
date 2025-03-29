export const baseUrl = import.meta.env.VITE_API_URL;

const endpoints = {
  auth: "/auth",
  category: "/categories",
  tasklist: "/task-list",
  invite: "/invite",
};

export default endpoints;
