"use client";
import React, { useState } from "react";
import {
  Container,
  Flex,
  Image,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { ProductCard } from "@/components";
import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";
import { ObjectToParams } from "@/utils/objectToParams";
import Link from "next/link";
import empty from "@/assets/empty-cart.png";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber] = useState(1);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const category_name = urlSearchParams.get("name");
  const params = useParams();

  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({
      pageSize,
      pageNumber,
      order: "asc",
      category_id: params?.id,
    })
  );

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery(params?.id);

  return (
    <Container size={"xl"}>
      <div className="p-2 md:px-[70px] md:py-10">
        {dataCt?.payload?.length > 0 && (
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
            dataCt?.payload?.map((item: any, index: number) => (
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
                dataProducts?.payload?.map((item: any, index: number) => (
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
            </SimpleGrid>
          </div>
        </Flex>
        {dataProducts?.payload?.length == 0 && (
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
    </Container>
  );
}
