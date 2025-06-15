import axios from "axios";

// ✅ Create basic Axios instance
const api = axios.create({
  baseURL: process.env.APIBASEURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Add token to headers
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//  GET request
export const getData = async (url, withToken = false) => {
  try {
    const headers = withToken ? getAuthHeaders() : {};
    const response = await api.get(url, { headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// POST request
export const postData = async (url, data, withToken = false) => {
  try {
    const headers = withToken ? getAuthHeaders() : {};
    const response = await api.post(url, data, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//
export const postFormData = async (url, formData, withToken = false) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      ...(withToken ? getAuthHeaders() : {}),
    };
    const response = await api.post(url, formData, { headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//  (for updates)
export const updateData = async (url, data, withToken = false) => {
  try {
    const headers = withToken ? getAuthHeaders() : {};
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//  DELETE request
export const deleteData = async (url, withToken = false) => {
  try {
    const headers = withToken ? getAuthHeaders() : {};
    const response = await api.delete(url, { headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//  Simple error
const handleError = (error) => {
  console.error("API Error:", error);
  return {
    success: false,
    message: error.response?.data?.message || "Network Error",
  };
};

export default api;
