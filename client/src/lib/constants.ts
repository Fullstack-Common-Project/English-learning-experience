export const BASE_IMAGE_URL = "http://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";


export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5075/api/v1/GeneralGame";

// export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7292/api/v1";


export const getFetchOptions = (): RequestInit => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};


