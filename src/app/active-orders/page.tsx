"use client";

import React, { useEffect, useState } from "react";
import { ActiveOrderCard, Icon } from "@/components";

import {
  Container,
  Flex,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useGetAllOrdersQuery } from "@/store";
import Head from "next/head";

export default function ActiveOrdersPage() {
  const [orders, setOrders] = useState([]);

  const { data, error, isError, isSuccess, isLoading } =
    useGetAllOrdersQuery("?type=active");

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess) {
      setOrders(data?.payload);
    }
  }, [isError, isSuccess]);

  return (
    <Container size={"xl"}>
      <Head>
        <title>
          Активные заказы - Душанбе Маркет | Отслеживайте свои текущие покупки и
          заказы
        </title>
        <meta
          name="description"
          content="Перейдите на страницу активных заказов на Душанбе Маркет, чтобы отслеживать состояние и доставку ваших текущих покупок. Всегда будьте в курсе!"
        />
        <meta
          name="keywords"
          content="активные заказы, отслеживание заказов, Душанбе Маркет, текущие покупки, состояние заказов, доставка"
        />

        <meta property="og:title" content="Активные заказы на Душанбе Маркет" />
        <meta
          property="og:description"
          content="Отслеживайте состояние и доставку ваших текущих покупок на Душанбе Маркет. Перейдите на страницу активных заказов и оставайтесь в курсе всего происходящего!"
        />
      </Head>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">
              Cписок активные заказы
            </h1>
            <Text className="p-0 m-0">
              ({data?.payload?.length || "0"} товар)
            </Text>
          </Flex>
          {orders?.length == 0 && (
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
          <SimpleGrid
            cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {!isLoading &&
              orders?.map((item: any, index: number) => (
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
        className="h-screen w-screen fixed overflow-hidden scrollbar-hide"
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </Container>
  );
}
