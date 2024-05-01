"use client";
import React from "react";
import { Icon, ProductCard } from "@/components";
import { Container, Flex, Text } from "@mantine/core";

export default function ActiveOrdersPage() {
  const activeOrdersList: any = [];

  return (
    <Container size={"xl"}>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">
              Cписок активные заказы
            </h1>
            <Text className="p-0 m-0">({activeOrdersList?.length} товар)</Text>
          </Flex>
          {activeOrdersList?.length == 0 && (
            <Flex
              direction={"column"}
              gap={"lg"}
              className="w-full h-[600px]"
              align={"center"}
              justify={"center"}
            >
              <Icon
                name="shippingExpress"
                className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
              />
              <Flex direction={"column"} align={"center"}>
                <Text className="text-[#212121] font-bold text-[16px]">
                  У вас нет активных заказов.
                </Text>
                <Text className="text-center">
                  Воспользуйтесь поиском, чтобы найти всё, что нужно.
                </Text>
              </Flex>
            </Flex>
          )}
          {activeOrdersList?.length > 0 && (
            <Flex gap={"lg"} wrap={"wrap"} align={"center"} justify={"start"}>
              {activeOrdersList?.map((item: any, index: number) => (
                <ProductCard
                  key={index}
                  id={item?.id}
                  img={item?.images}
                  name={item?.name}
                  price={item?.price}
                  created_by={item?.created_by}
                  storeName={item?.storeName}
                />
              ))}
            </Flex>
          )}
        </div>
      </div>
    </Container>
  );
}
