import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
  title: `Мой профиль - Душанбе Маркет | Управляйте своим аккаунтом и
          настройками здесь`,
  description:
    "Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!",
  keywords:
    "профиль, аккаунт, настройки, история заказов, Душанбе Маркет, управление данными, безопасность",
  openGraph: {
    title: "Мой профиль на Душанбе Маркет",
    description:
      "Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!",
    url: "https://dushanbemarket.com/profile",
    type: "website",
    images: [{ url: "./logo.png" }],
  },
};

export default function Page() {
  return <ProfilePage />;
}
