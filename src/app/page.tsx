"use client";

import { Image } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";

import { ObjectToParams } from "@/utils/objectToParams";
import { Container, Flex, SimpleGrid, Skeleton } from "@mantine/core";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ProductCard } from "@/components";
import { RootState } from "@/store/store";

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber] = useState(1);

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery("home-ct");

  const {
    data: dataSubCt,
    isError: isErrorSubCt,
    isSuccess: isSuccessSubCt,
    isLoading: isLoadingSubCt,
    error: errorSubCt,
  } = useGetAllWidgetsQuery("home-sub-ct");

  const {
    data: dataCarousel,
    isError: isErrorCarousel,
    isSuccess: isSuccessCarousel,
    isLoading: isLoadingCarousel,
    error: errorCarousel,
  } = useGetAllWidgetsQuery("home-carousel");

  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({ pageSize, pageNumber, order: "rand" })
  );

  useEffect(() => {
    refetchProducts();
  }, [pageSize, pageNumber, refetchProducts]);

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

  useEffect(() => {
    if (isSuccessSubCt) {
      setSubCategories(dataSubCt?.payload);
    }
  }, [isSuccessSubCt, isErrorSubCt]);

  return (
    <Container size={"xl"}>
      <div className={"p-2 md:px-[70px] md:py-10"}>
        <Flex
          gap={"lg"}
          className="md:flex-wrap overflow-scroll scrollbar-hide md:mb-10 mb-4"
        >
          {isLoadingCt &&
            Array.from({ length: 14 }, (_, index) => (
              <Skeleton
                key={index}
                className="shrink-0 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0"
                circle
                mb={"xl"}
              />
            ))}

          {!isLoadingCt &&
            categories?.map((item: any, index: number) => (
              <Link
                className="no-underline text-[black]"
                key={index}
                href={`/category/${item?.category_id}?name=${item?.ct?.name}`}
              >
                <Flex direction={"column"} align={"center"}>
                  <Image
                    src={item?.image}
                    className="shrink-0 border-[3px] border-green border-solid p-1 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full"
                    alt=""
                  />
                  <p className="text-sm md:text-base text-center w-[100px]">
                    {item?.name}
                  </p>
                </Flex>
              </Link>
            ))}
        </Flex>

        <SimpleGrid
          cols={{ base: 1, sm: 1 }}
          spacing="md"
          className="mb-4 md:mb-10"
        >
          {isLoadingCarousel && (
            <Skeleton
              className="md:h-[500px] h-[250px]"
              radius="md"
              animate={false}
            />
          )}

          {/* carousel */}
          {!isLoadingCarousel && dataCarousel?.payload && (
            <div
              // src={dataCarousel?.payload[0]?.image}
              // alt={`Image`}
              className="md:h-[500px] h-[250px] bg-[red]"
              style={{ borderRadius: "8px", width: "100%", objectFit: "cover" }}
            />
          )}
        </SimpleGrid>

        <h1>Категории</h1>
        <Flex
          gap={"lg"}
          className="md:flex-wrap overflow-scroll scrollbar-hide md:mb-10 mb-4"
        >
          {isLoadingSubCt &&
            Array.from({ length: 14 }, (_, index) => (
              <Skeleton
                key={index}
                className="shrink-0 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0"
                circle
                mb={"xl"}
              />
            ))}
          {!isLoadingSubCt &&
            subCategories?.map((item: any, index: number) => (
              <Link
                className="no-underline text-[black]"
                key={index}
                href={`/catalog/${item?.category_id}?name=${item?.ct?.name}`}
              >
                <Flex key={index} direction={"column"} align={"center"}>
                  <Image
                    className="border-green border-solid  shrink-0 h-[80px] p-1 md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full"
                    src={item?.image}
                    alt=""
                  />
                  <p className="text-sm md:text-base text-center w-[100px]">
                    {item?.name}
                  </p>
                </Flex>
              </Link>
            ))}
        </Flex>

       {!!products?.length && <h1>Новинки</h1>}
        <SimpleGrid
          cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {isLoadingProducts &&
            Array.from({ length: 10 }, (_, index) => (
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
    </Container>
  );
}
