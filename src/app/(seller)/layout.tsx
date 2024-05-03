"use client";

import { MerchantLayout } from "@/merchant-components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MerchantLayout>{children}</MerchantLayout>;
}
