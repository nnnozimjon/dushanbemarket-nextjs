"use client";

import { AppFooter, AppHeader } from "@/components";
import { useAuthorize } from "@/hooks/useAuthorize";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checkRole = (userRole: string) => userRole === 'client';
  useAuthorize(checkRole, '/seller');

  return (
    <Fragment>
      <AppHeader />
        <div className="pt-[110px] md:pt-[50px]">{children}</div>
      <AppFooter />
    </Fragment>
  );
}
