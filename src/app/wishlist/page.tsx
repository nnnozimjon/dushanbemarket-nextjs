import React from 'react'
import WishlistPage from './WishlisPage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Мой список желаемого - Сохраните свои любимые товары здесь",
  description:
    "Создайте список желаемого на Душанбе Маркет и сохраните там все товары, которые хотели бы приобрести в будущем. Удобно, просто и всегда под рукой!",
  keywords:
    "список желаемого, сохранить товары, покупки в будущем, Душанбе Маркет, удобство покупок",
  openGraph: {
    title: "Мой список желаемого на Душанбе Маркет",
    description:
      "Сохраняйте свои любимые товары на Душанбе Маркет в списке желаемого и легко найдите их в будущем. Управляйте своими покупками удобно и эффективно!",
    url: "https://dushanbemarket.com/wishlist",
    type: "website",
    images: [{ url: "./logo.png" }],
  },
};

export default function page() {
  return <WishlistPage />
}
