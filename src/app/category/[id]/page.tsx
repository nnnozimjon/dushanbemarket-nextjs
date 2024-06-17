"use client";

import React from "react";
import { Container, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import { ProductCard } from "@/components";
import Link from "next/link";
import empty from "@/assets/empty-cart.png";
import { Pagination } from "@/components";
import { CategoryController } from "@/controllers/CategoryController";

export default function CategoryPage() {
  const {
    categories,
    category_name,
    dataProducts,
    handleChangePage,
    isLoadingCt,
    isLoadingProducts,
    products,
  } = CategoryController();

  return (
    <Container size={"xl"}>
      {/* <Head>
        <title>
          Мой профиль - Душанбе Маркет | Управляйте своим аккаунтом и
          настройками здесь{" "}
        </title>
        <meta
          name="description"
          content="Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!"
        />
        <meta
          name="keywords"
          content="профиль, аккаунт, настройки, история заказов, Душанбе Маркет, управление данными, безопасность"
        />

        <meta property="og:title" content="Мой профиль на Душанбе Маркет" />
        <meta
          property="og:description"
          content="Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!"
        />
        <meta property="og:image" content="./logo.png" />
        <meta property="og:url" content="https://dushanbemarket.com/profile" />
        <meta property="og:type" content="website" />
      </Head> */}
      <div className="p-2 md:px-[70px] md:py-10">
        {categories?.length > 0 && (
          <h1 className="text-[18px] md:text-[2em] mb-2">
            Популярные категории
          </h1>
        )}
        <SimpleGrid
          cols={{ base: 3, md: 6, lg: 6 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {!isLoadingCt &&
            categories?.map((item: any, index: number) => (
              <Link
                className="no-underline text-[black]"
                key={index}
                href={`/catalog/${item?.category_id}?name=${item?.ct?.name}`}
              >
                <Flex direction={"column"} align={"center"} key={index}>
                  <Image
                    src={item?.image}
                    className="rounded-xl w-full"
                    alt={`${item?.name}`}
                  />
                  <p className="text-sm md:text-base mt-2 text-center">
                    {item?.name}
                  </p>
                </Flex>
              </Link>
            ))}
        </SimpleGrid>
        <br />
        <Flex
          justify={"space-between"}
          className="py-[30px] flex-col md:flex-row align-baseline"
        >
          <h1 className="text-[24px] md:text-[2em]">{category_name}</h1>
          <Text className="text-[rgba(0,0,0,0.3)]">0 товар</Text>
        </Flex>
        <Flex className="py-[30px]" gap={"lg"}>
          {/* <div className='w-[350px] p-2 h-screen hidden md:block'>
          <Filter />
        </div> */}

          <div className="w-full">
            <SimpleGrid
              cols={{ base: 2, lg: 5, md: 4, sm: 2 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              {isLoadingProducts &&
                Array.from({ length: 12 }, (_, index) => (
                  <ProductCard
                    key={index}
                    id={0}
                    img={""}
                    name={""}
                    price={0}
                    created_by={0}
                    storeName=""
                  />
                ))}

              {!isLoadingProducts &&
                products?.map((item: any, index: number) => (
                  <ProductCard
                    key={index}
                    id={item?.id}
                    img={item?.images}
                    name={item?.name}
                    price={item?.price}
                    created_by={item?.created_by}
                    storeName={item?.storeName}
                    sizes={item?.sizes}
                    colors={item?.colors}
                  />
                ))}
            </SimpleGrid>
          </div>
        </Flex>
        {products?.length == 0 && (
          <Flex
            direction={"column"}
            gap={"lg"}
            className=" w-full"
            align={"center"}
            justify={"center"}
          >
            <Image
              src={empty.src}
              alt="empty"
              className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
            />
            <Flex direction={"column"} align={"center"}>
              <Text className="text-[#212121] font-bold text-[16px] text-center">
                К сожалению, в этой категории нет товаров.
              </Text>
              <Text className="text-center">
                Пожалуйста, проверьте позже или воспользуйтесь поиском для
                поиска нужного продукта.
              </Text>
            </Flex>
          </Flex>
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          total={dataProducts?.totalPages}
          onChange={handleChangePage}
        />
      </div>
    </Container>
  );
}
