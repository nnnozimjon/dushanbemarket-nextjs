"use client";

import React from "react";
import {
  Button,
  CheckIcon,
  ColorSwatch,
  Container,
  Flex,
  Image,
  Pill,
  rem,
  Text,
} from "@mantine/core";
import { Counter, Icon } from "@/components";
import { colors } from "@/utils/color";
import { LoginModal } from "@/modals";
import { CartController } from "@/controllers/CartController";

export default function CartPage() {
  const {
    cart,
    completeOrder,
    decreaseProductQty,
    filterColors,
    increaseProductQty,
    opened,
    sortedProducts,
    updateProductOptions,
  } = CartController();
  
  return (
    <Container size={"xl"}>
      <div className="my-4 md:py-10 flex lg:flex-row flex-col gap-5">
        <div className="w-full">
          <Flex gap={"md"} align={"center"}>
            <h1 className="text-[18px] md:text-[2em]">Корзина</h1>
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
              {sortedProducts?.map((store: any, index: number) => (
                <Flex
                  key={index}
                  direction={"column"}
                  gap={"lg"}
                  className="overflow-hidden"
                >
                  <div className="bg-[rgb(247,248,249)] w-full p-5 rounded-md">
                    <Flex justify={"space-between"} className="w-full">
                      <Text className="text-[#949aa0]">Способ доставки</Text>
                      <Text className="text-[#949aa0]">Общая сумма</Text>
                    </Flex>
                    <Flex justify={"space-between"} className="w-full">
                      <Text>Доставка от {store?.storeName}</Text>
                      <Text className="font-bold">
                        {Number(
                          store?.products.reduce(
                            (total: any, product: any) =>
                              total + product.price * product.quantity,
                            0
                          )
                        ).toFixed(2)}{" "}
                        c.
                      </Text>
                    </Flex>
                  </div>
                  {store?.products?.map((product: any, index: number) => (
                    <div
                      key={index}
                      className="bg-[rgb(247,248,249)] p-2 rounded-[14px]"
                    >
                      <Flex gap={"md"}>
                        <Image
                          className="h-[100px] w-auto rounded-[14px]"
                          src={product?.images?.split(",")[0]}
                          alt=""
                        />
                        <div>
                          <Text className="font-bold text-[20px]">
                            {Number(product?.price).toFixed(2)} c.
                          </Text>
                          <Text className="text-[18px]">{product?.name}</Text>
                        </div>
                      </Flex>
                      <Flex className="w-fit" align={"end"} gap={"lg"}>
                        <Text className="p-0 m-0 text-[#949aa0]">
                          Количество:
                        </Text>
                        <Counter
                          increase={() => increaseProductQty(product)}
                          decrease={() => decreaseProductQty(product)}
                          qty={product?.quantity}
                        />
                      </Flex>
                      <div>
                        {!!product?.sizes && (
                          <Flex
                            gap={"md"}
                            align={"center"}
                            className="flex-wrap"
                          >
                            <Text className="p-0 m-0 text-[#949aa0]">
                              Размеры:
                            </Text>

                            {product?.sizes
                              ?.split(",")
                              ?.map((size: string, index: number) => (
                                <Pill
                                  key={index}
                                  bg={
                                    product?.selectedOptions?.size == size
                                      ? "green"
                                      : "white"
                                  }
                                  c={
                                    product?.selectedOptions?.size == size
                                      ? "white"
                                      : "green"
                                  }
                                  className="cursor-pointer"
                                  onClick={() =>
                                    updateProductOptions(product?.id, {
                                      size: size,
                                    })
                                  }
                                >
                                  {size}
                                </Pill>
                              ))}
                          </Flex>
                        )}
                        {!!product?.colors && (
                          <Flex gap={"lg"} align={"center"}>
                            <Text className="p-0 m-0 text-[#949aa0]">
                              Цвета:
                            </Text>
                            {filterColors(
                              colors,
                              product?.colors?.split(",")
                            )?.map((color, index) => (
                              <ColorSwatch
                                key={index}
                                color={color?.color}
                                component="button"
                                className={`h-[20px] w-[20px] rounded-full cursor-pointer`}
                                style={{
                                  color:
                                    color?.value == "white" ? "green" : "white",
                                }}
                                onClick={() =>
                                  updateProductOptions(product?.id, {
                                    color: color?.value,
                                  })
                                }
                              >
                                {product?.selectedOptions?.color ==
                                  color?.value && (
                                  <CheckIcon
                                    style={{ width: rem(12), height: rem(12) }}
                                  />
                                )}
                              </ColorSwatch>
                            ))}
                          </Flex>
                        )}
                      </div>
                    </div>
                  ))}
                </Flex>
              ))}
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
                onClick={completeOrder}
              >
                Перейти к оформлению
              </Button>
            </div>
          </div>
        )}
      </div>
      <LoginModal onClose={close} opened={opened} />
      <br />
      <br />
      <br />
    </Container>
  );
}
