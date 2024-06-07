import Home from "./HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: './favicon.png',
  title: "Душанбе Маркет - Простые и Удобные Покупки",
  description:
    "Душанбе Маркет: Ваш лучший выбор для онлайн шопинга в Таджикистане. Широкий ассортимент товаров по выгодным ценам. Присоединяйтесь к нам сегодня!",
  keywords:
    "Душанбе Маркет, онлайн маркетплейс, Таджикистан, покупки, онлайн шопинг, товары, услуги",
  openGraph: {
    title: "Душанбе Маркет - Простые и Удобные Покупки",
    description:
      "Душанбе Маркет: Ваш лучший выбор для онлайн шопинга в Таджикистане. Широкий ассортимент товаров по выгодным ценам. Присоединяйтесь к нам сегодня!",
    url: "https://dushanbemarket.com",
    type: "website",
    images: [{ url: "./logo.png" }],
  },
};

export default function Page() {
  return <Home />;
}
