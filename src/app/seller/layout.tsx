"use client";

import { useAuthorize } from "@/hooks/useAuthorize";
import { MerchantLayout } from "@/merchant-components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkRole = (userRole: string) => userRole === 'merchant';
  useAuthorize(checkRole, '/');
  
    return <MerchantLayout>{children}</MerchantLayout>;
}
