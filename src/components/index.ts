import dynamic from "next/dynamic";


export const Counter = dynamic(() => import("./counter/counter"), { ssr: true });
export const AppFooter = dynamic(() => import("./footer/footer"), { ssr: true });
export const AppHeader = dynamic(() => import('./header/header'), { ssr: true })
export const AppLogo = dynamic(() => import("./logo/logo"), { ssr: true });
export const Icon = dynamic(() => import("./icon/icon"), { ssr: true });
export const ProductCard = dynamic(() => import("./product-card/product-card"), { ssr: true });
export const Filter = dynamic(() => import("./filter/filter"), { ssr: true });
export const Accordion = dynamic(() => import("./accordion/accordion"), { ssr: true });
export const MultiRadioSelect = dynamic(() => import("./multi-radio-select/multi-radio-select"), { ssr: true });
// export const Layout = dynamic(() => import("./layout"), { ssr: false });
