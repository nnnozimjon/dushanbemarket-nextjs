"use client"

import React from "react";
import { ProductListCard } from "@/merchant-components";
import { Flex, Image, SimpleGrid, Text } from "@mantine/core";
import { useGetAllProductQuery } from "@/store";
import empty from "@/assets/empty-cart.png";

interface ProductPayload {
  images: string;
  id: number;
  name: string;
}

export default function ProductList() {
  const { data, isError, error, isSuccess, isLoading, refetch } =
    useGetAllProductQuery({});

  return (
    <div>
      <SimpleGrid
        cols={{ lg: 4, md: 3, sm: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {!isLoading &&
          data?.payload?.map((product: ProductPayload, index: number) => (
            <ProductListCard
              refetch={refetch}
              id={product?.id}
              productName={product?.name}
              images={product?.images?.split(",")}
              key={index}
            />
          ))}
      </SimpleGrid>
      {data?.payload?.length == 0 ||
        (isError && (
          <Flex
            direction={"column"}
            gap={"lg"}
            className="w-full h-full mt-[100px]"
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
                Вы еще не добавили ни одного товара!
              </Text>
              <Text className="text-center">
                Добавьте свои продукты, чтобы разместить их здесь.
              </Text>
            </Flex>
          </Flex>
        ))}
    </div>
  );
}
