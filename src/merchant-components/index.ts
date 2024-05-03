import dynamic from "next/dynamic";

export const Header = dynamic(() => import('./header/header'), { ssr: true })
export const Footer = dynamic(()=> import('./navbar/navbar'), { ssr: true })
export const ProductListCard = dynamic(() => import('./product-list-card/product-list-card'), { ssr: true })
export const MerchantLayout = dynamic(() => import('./layout/layout'), { ssr: true})