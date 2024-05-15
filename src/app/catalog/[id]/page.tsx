"use client";

import React, { useEffect, useState } from "react";
import { Container, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import { Icon, ProductCard } from "@/components";
import { useParams } from "next/navigation";
import { ObjectToParams } from "@/utils/objectToParams";
import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";
import empty from "@/assets/empty-cart.png";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      sub_category_id: params.id,
    })
  );

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery(params?.id);

  useEffect(() => {
    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [isSuccessProducts, isErrorProducts]);

  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt]);

  return (
    <Container size={"xl"}>
      <div className="md:py-10">
        {/* <h1 className="text-[18px] md:text-[2em] mb-2">Популярные категории</h1>
        <SimpleGrid
          cols={{ base: 3, md: 6, lg: 8 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          {Array.from({ length: 8 }, (_, index) => (
            <Flex direction={'column'} align={'center'} key={index}>
              <img
                src="https://ir.ozone.ru/s3/cms/59/tf9/wc250/1.jpg"
                className="rounded-xl w-full"
                alt={`Image ${index}`}
              />
              <p className="text-sm md:text-base mt-2">Смартфоны</p>
            </Flex>
          ))}
        </SimpleGrid>
        <br /> */}
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
    </Container>
  );
}
