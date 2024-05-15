"use client";

import { getCookie } from "cookies-next";

export const usingAuth = (): string => {
  return getCookie("access_token") || "";
};
