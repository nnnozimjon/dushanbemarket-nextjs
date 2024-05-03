"use client";

import { AppFooter, AppHeader } from "@/components";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <AppHeader />
      <div className="pt-[110px] md:pt-[50px]">{children}</div>
      <AppFooter />
    </Fragment>
  );
}
