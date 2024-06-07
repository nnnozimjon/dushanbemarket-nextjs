import { Metadata, ResolvingMetadata } from "next";
import ProductPage from "./ProductPage";
import { frontBaseUrl } from "@/utils";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const product = await fetch(frontBaseUrl + "/product/" + id).then((res) =>
    res.json()
  );

  return {
      icons: './favicon.png',
    title: `${product?.payload?.name} - Купить онлайн на Душанбе Маркет | Лучшие цены и широкий
      ассортимент`,
    description: `Покупайте ${product?.payload?.name} онлайн на Душанбе Маркет. Широкий выбор, отличные цены и удобная доставка. Не упустите возможность приобрести ${product?.payload?.name} прямо сейчас!`,
    keywords: `${product?.payload?.name}, купить онлайн, Душанбе Маркет, цена, доставка`,
    openGraph: {
      title: `${product?.payload?.name} - Купить онлайн на Душанбе Маркет`,
      description: `Покупайте ${product?.payload?.name} онлайн на Душанбе Маркет. Широкий выбор, отличные цены и удобная доставка. Не упустите возможность приобрести ${product?.payload?.name} прямо сейчас!`,
      url: "https://dushanbemarket.com/product/" + id,
      type: "website",
      images: [{ url: "./logo.png" }],
    },
  };
}

export default function Page() {
  return <ProductPage />;
}
