import React from "react";
import { Flex, Image, Skeleton, Text } from "@mantine/core";

import Link from "next/link";

interface Props {
  img: string;
  name: string;
  order_id: number;
  order_item_id: number;
  product_id: number;
  status: string;
}

export function ActiveOrderCard({
  img,
  name,
  order_id,
  order_item_id,
  status,
  product_id,
}: Props) {
  const productImage = img ? img?.split(",") : [];

  return (
    <Flex direction={"column"} className={`flex-shrink-0`}>
      <Flex
        direction={"column"}
        className={"relative  bg-[#f8f8f8] rounded-[25px] p-5"}
      >
        {!img ? (
          <Skeleton className="h-full" radius="xl" />
        ) : (
          <Image
            src={productImage[0]}
            className="object-cover w-full h-full"
            alt=""
          />
        )}
      </Flex>
      <Flex className="bg-[#f8f8f8] mt-2 p-2 rounded-[10px]" align={"center"}>
        <div className="w-full">
          {!name ? (
            <Skeleton className="h-[15px] w-4/6 mt-4" radius="xl" />
          ) : (
            <Link
              href={`/product/${product_id}`}
              className={
                "text-[14px] md:text-[16px] w-fit font-bold text-[#212121] mb-0 font-[Urbanist] no-underline "
              }
            >
              {name}
            </Link>
          )}
          {status ? (
            <Text className="mt-0 text-[14px] md:text-[16px] font-bold text-[#01B763] flex items-center">
              {status}
            </Text>
          ) : (
            <Skeleton className="h-[15px] w-4/12 mt-4" radius="xl" />
          )}
        </div>
      </Flex>
    </Flex>
  );
}
