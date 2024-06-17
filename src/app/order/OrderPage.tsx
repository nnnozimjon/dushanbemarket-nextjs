"use client";

import React from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  InputBase,
  LoadingOverlay,
  Paper,
  Text,
  Textarea,
} from "@mantine/core";
import { Icon } from "@/components";
import { formatPhoneNumber } from "@/utils";
import { OrderController } from "@/controllers/OrderController";

export default function OrderPage() {
  const { cart, isLoading, order, processOrder, setOrder, sortedProducts } =
    OrderController();

  return (
    <Container size={"xl"}>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">Оформление товара</h1>
            <Text className="p-0 m-0">({cart?.totalItems} товар)</Text>
          </Flex>
          {cart?.products.length == 0 ? (
            <Flex
              direction={"column"}
              gap={"lg"}
              className="w-full h-[600px]"
              align={"center"}
              justify={"center"}
            >
              <Icon
                variant="outline"
                name="buy"
                className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
              />
              <Flex direction={"column"} align={"center"}>
                <Text className="text-[#212121] font-bold text-[16px]">
                  Корзина пуста
                </Text>
                <Text className="text-center">
                  Воспользуйтесь поиском, чтобы найти всё, что нужно.
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Flex direction={"column"} gap={"lg"} className="overflow-hidden">
              <Flex direction={"column"} gap={"lg"} className="overflow-hidden">
                <div className="bg-[rgb(247,248,249)] w-full p-5 rounded-md">
                  <Paper radius={"lg"} className="p-5">
                    <h3>Адрес и время</h3>
                    <br />
                    <Flex gap={"lg"} direction={"column"}>
                      <InputBase
                        value={order?.phone_number}
                        withAsterisk
                        label="Номер телефона"
                        placeholder="Номер телефона"
                        classNames={{ input: "h-[60px] rounded-[16px]" }}
                        onChange={(e) =>
                          setOrder((prev) => ({
                            ...prev,
                            phone_number: formatPhoneNumber(e.target.value),
                          }))
                        }
                      />
                      <InputBase
                        withAsterisk
                        label="Адрес доставки"
                        placeholder="Адрес доставки"
                        classNames={{ input: "h-[60px] rounded-[16px]" }}
                        value={order?.address}
                        onChange={(e) =>
                          setOrder((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                      <Textarea
                        placeholder="Коментарий курьеру, ориентир место доставки и тд."
                        value={order?.comment}
                        classNames={{
                          input: "h-[150px] rounded-[16px]",
                        }}
                        onChange={(e) =>
                          setOrder((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                      />
                      <Alert>
                        После подтверждения заявки вам доставят товар в
                        ближайшие времени. Пожалуйста, ждите звонка.
                      </Alert>
                    </Flex>
                  </Paper>

                  <br />

                  <Paper radius={"lg"}>
                    <div className="p-5">
                      <h3>Список товаров</h3>
                      {sortedProducts?.map((store: any, index) => (
                        <Flex direction={"column"} key={index}>
                          <Box>
                            <Text className="text-[8px]">
                              {store?.products?.map(
                                (product: any, index: number) => (
                                  <Text key={index}>{product?.name}</Text>
                                )
                              )}
                            </Text>
                            <Text className="text-[12px] text-[rgba(0,0,0,0.3)]">
                              Продавец: {store?.storeName}
                            </Text>
                          </Box>
                          <hr className="my-4 border-[rgba(0,0,0,0.1)]" />
                        </Flex>
                      ))}
                      <br />
                    </div>
                  </Paper>
                </div>
              </Flex>
            </Flex>
          )}
        </div>
        {cart?.products.length >= 1 && (
          <div className="h-full lg:w-1/3 w-full pt-10">
            <div className=" bg-[rgb(247,248,249)] p-5 rounded-md">
              <Flex
                justify={"space-between"}
                align={"baseline"}
                className="w-full"
                gap={"lg"}
              >
                <Text className="text-[#949aa0] w-fit text-[14px]">
                  Товары({cart?.totalItems})
                </Text>
                <div className="border-gray-light border-b-[1px] border-0 border-dotted w-full" />
                <Text className="text-[#949aa0] w-fit text-[14px]">
                  {Number(cart?.totalPrice).toFixed(2)}
                  c.
                </Text>
              </Flex>
              <Flex
                justify={"space-between"}
                align={"baseline"}
                className="w-full"
                gap={"lg"}
              >
                <Text className="text-[#949aa0] w-fit text-[14px]">Скидка</Text>
                <div className="border-gray-light border-b-[1px] border-0 border-dotted w-full" />
                <Text className="text-[#949aa0] w-fit text-[14px]">
                  {"0"}c.
                </Text>
              </Flex>
              <Flex
                justify={"space-between"}
                align={"baseline"}
                className="w-full"
                gap={"lg"}
              >
                <Text className="text-[#949aa0] w-fit text-[14px]">
                  Доставка
                </Text>
                <Text className="text-[#949aa0] w-fit text-[14px]">
                  0 - 25с.
                </Text>
              </Flex>
              <Flex
                justify={"space-between"}
                align={"baseline"}
                className="w-full"
                gap={"lg"}
              >
                <Text className="text-[#000] font-bold text-[18px] w-fit">
                  Итого
                </Text>
                <div className="border-gray-light border-b-[1px] border-0 border-dotted w-full" />
                <Text className="text-[#000] font-bold text-[18px] w-fit">
                  {Number(cart?.totalPrice).toFixed(2)}
                  c.
                </Text>
              </Flex>
              <br />
              <Button
                bg={"green"}
                className="w-full text-[18px] h-[50px]"
                onClick={processOrder}
              >
                Оформить
              </Button>
            </div>
          </div>
        )}
      </div>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        className="h-screen w-screen fixed overflow-hidden scrollbar-hide"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </Container>
  );
}
