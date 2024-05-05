"use client";
import React, { useEffect } from "react";
import { Icon, ProductCard } from "@/components";
import {
  Container,
  Flex,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import ActiveOrderCard from "@/components/active-orders-card/active-orders-card";
import { useGetAllOrdersQuery } from "@/store";

export default function CompletedOrdersPage() {
  const { data, error, isError, isSuccess, isLoading } = useGetAllOrdersQuery(
    '?type=completed'
  );

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess) {
    }
  }, [isError, isSuccess]);

  return (
    <Container size={"xl"}>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">
              Cписок завершенных заказов
            </h1>
            <Text className="p-0 m-0">({data?.payload?.length || '0'} товар)</Text>
          </Flex>
          {data?.payload?.length == 0 || isError && (
            <Flex
              direction={"column"}
              gap={"lg"}
              className="w-full h-[600px]"
              align={"center"}
              justify={"center"}
            >
              <Icon
                name="shippingEconomy"
                className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
              />
              <Flex direction={"column"} align={"center"}>
                <Text className="text-[#212121] font-bold text-[16px]">
                  У вас нет завершенных заказов
                </Text>
                <Text className="text-center">
                  Воспользуйтесь поиском, чтобы найти всё, что нужно.
                </Text>
              </Flex>
            </Flex>
          )}
          <SimpleGrid
            cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {!isLoading &&
              data?.payload?.map((item: any, index: number) => (
                <ActiveOrderCard
                  key={index}
                  order_id={item?.order_id}
                  order_item_id={item?.order_item_id}
                  product_id={item?.product_id}
                  img={item?.product_img}
                  name={item?.product_name}
                  status={item?.order_status}
                />
              ))}
          </SimpleGrid>
        </div>
      </div>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </Container>
  );
}
