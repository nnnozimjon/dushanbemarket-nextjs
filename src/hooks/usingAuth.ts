"use client";

export const usingAuth = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }

  return "";
};
