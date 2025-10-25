
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7292/api/v1";

export const getFetchOptions = (): RequestInit => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};


