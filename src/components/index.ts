import dynamic from "next/dynamic";

export const Counter = dynamic(() => import("./counter/counter"), {
  ssr: false,
});
export const AppFooter = dynamic(() => import("./footer/footer"), {
  ssr: false,
});
export const AppHeader = dynamic(() => import("./header/header"), {
  ssr: false,
});
export const AppLogo = dynamic(() => import("./logo/logo"), { ssr: false });
export const Icon = dynamic(() => import("./icon/icon"), { ssr: false });
export const ProductCard = dynamic(
  () => import("./product-card/product-card"),
  { ssr: false }
);
export const Filter = dynamic(() => import("./filter/filter"), { ssr: false });
export const Accordion = dynamic(() => import("./accordion/accordion"), {
  ssr: false,
});
export const MultiRadioSelect = dynamic(
  () => import("./multi-radio-select/multi-radio-select"),
  { ssr: false }
);

export const ActiveOrderCard = dynamic(
  () => import("./active-orders-card/active-orders-card"),
  { ssr: false }
);
export const Pagination = dynamic(() => import("./pagination/pagination"), {
  ssr: false,
});
