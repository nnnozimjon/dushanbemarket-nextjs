"use client";
import React from "react";
import { Icon, ProductCard } from "@/components";
import { Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state?.wishlist);

  return (
    <Container size={"xl"}>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">Cписок нравится</h1>
            <Text className="p-0 m-0">
              ({wishlist?.products?.length} товар)
            </Text>
          </Flex>
          {wishlist?.products.length == 0 && (
            <Flex
              direction={"column"}
              gap={"lg"}
              className="w-full h-[600px]"
              align={"center"}
              justify={"center"}
            >
              <Icon
                variant="outline"
                name="heart"
                className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
              />
              <Flex direction={"column"} align={"center"}>
                <Text className="text-[#212121] font-bold text-[16px]">
                  Cписок нравится пуста
                </Text>
                <Text className="text-center">
                  Воспользуйтесь поиском, чтобы найти всё, что нужно.
                </Text>
              </Flex>
            </Flex>
          )}

          {wishlist?.products?.length > 0 && (
            <SimpleGrid
              cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              {wishlist?.products?.map((item: any, index: number) => (
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
          )}
        </div>
      </div>
    </Container>
  );
}
