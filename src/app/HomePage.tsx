"use client";

import { Image } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";

import { ObjectToParams } from "@/utils/objectToParams";
import { Container, Flex, SimpleGrid, Skeleton } from "@mantine/core";
import Link from "next/link";
import { Pagination, ProductCard } from "@/components";

import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { redirect } from "@/utils/redirect";

interface CarouselBanners {
  id: number;
  image: string;
  category_id: number;
  name: string;
  ct: {
    name: string;
  };
}

export default function Home() {
  const autoplayCategories = useRef(Autoplay({ delay: 1000 }));
  const autoplayBannerAds = useRef(Autoplay({ delay: 4000 }));
  const autoplaySplitAds = useRef(Autoplay({ delay: 3000 }));
  const autoplayBannerAds2 = useRef(Autoplay({ delay: 4000 }));
  const autoplaySubCategories = useRef(Autoplay({ delay: 1000 }));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [bannerCarousel, setBannerCarousel] = useState<CarouselBanners[]>([]);
  const [splitCarousel, setSplitCarousel] = useState<CarouselBanners[]>([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

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
    data: dataSplitCarousel,
    isError: isErrorSplitCarousel,
    isSuccess: isSuccessSplitCarousel,
    isLoading: isLoadingSplitCarousel,
    error: errorSplitCarousel,
  } = useGetAllWidgetsQuery("home-split-carousel");

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

  // products
  useEffect(() => {
    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [isSuccessProducts, isErrorProducts]);

  // categories
  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt]);

  // sub-categories
  useEffect(() => {
    if (isSuccessSubCt) {
      setSubCategories(dataSubCt?.payload);
    }
  }, [isSuccessSubCt, isErrorSubCt]);

  // carousel
  useEffect(() => {
    if (isSuccessCarousel) {
      setBannerCarousel(dataCarousel?.payload);
    }
  }, [isSuccessCarousel, isErrorCarousel]);

  // split-carousel
  useEffect(() => {
    if (isSuccessSplitCarousel) {
      setSplitCarousel(dataSplitCarousel?.payload);
    }
  }, [isSuccessSplitCarousel, isErrorSplitCarousel]);

  function splitArray(array: CarouselBanners[]) {
    const midpoint = Math.floor(array.length / 2);
    const firstPart = array.slice(0, midpoint);
    const secondPart = array.slice(midpoint);
    return [firstPart, secondPart];
  }

  const [firstBannerPart, secondBannerPart] = splitArray(bannerCarousel);

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <Container size={"xl"}>
      <div className={"p-2 md:px-[70px] md:py-10"}>
        {/*  */}
        <Carousel
          withControls={false}
          align={"start"}
          slideSize={{ base: "11,1%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          // plugins={[autoplayCategories.current]}
          // onMouseEnter={autoplayCategories.current.stop}
          // onMouseLeave={autoplayCategories.current.reset}
        >
          {isLoadingCt &&
            Array.from({ length: 14 }, (_, index) => (
              <Carousel.Slide key={index}>
                <Skeleton
                  className="shrink-0 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0"
                  circle
                  mb={"xl"}
                />
              </Carousel.Slide>
            ))}

          {!isLoadingCt &&
            categories?.map((item: any, index: number) => (
              <Carousel.Slide key={index}>
                <Link
                  className="no-underline text-[black]"
                  key={index}
                  href={`/category/${item?.category_id}?name=${item?.ct?.name}`}
                >
                  <Flex direction={"column"} align={"center"}>
                    <Image
                      src={item?.image}
                      className="shrink-0 border-[3px] border-green border-solid p-1 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0 rounded-full cursor-pointer"
                      alt=""
                    />
                    <p className="text-sm md:text-base text-center w-[100px]">
                      {item?.name}
                    </p>
                  </Flex>
                </Link>
              </Carousel.Slide>
            ))}
        </Carousel>
        <br />

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
          <Carousel
            withControls={false}
            loop
            plugins={[autoplayBannerAds.current]}
            onMouseEnter={autoplayBannerAds.current.stop}
            onMouseLeave={autoplayBannerAds.current.reset}
          >
            {!isLoadingCarousel &&
              firstBannerPart?.map((item: any, index: number) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={item.image}
                    alt={`ads`}
                    className="bg-[#ccc] cursor-pointer"
                    onClick={() =>
                      item?.link ? redirect(item?.link) : () => {}
                    }
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Slide>
              ))}
          </Carousel>
        </SimpleGrid>
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
          <Carousel
            withControls={false}
            plugins={[autoplayBannerAds2.current]}
            loop
            onMouseEnter={autoplayBannerAds2.current.stop}
            onMouseLeave={autoplayBannerAds2.current.reset}
          >
            {!isLoadingCarousel &&
              secondBannerPart?.map((item: any, index: number) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={item.image}
                    alt={`ads`}
                    className="bg-[#ccc] cursor-pointer"
                    onClick={() =>
                      item?.link ? redirect(item?.link) : () => {}
                    }
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Slide>
              ))}
          </Carousel>
        </SimpleGrid>

        {!isLoadingSplitCarousel && splitCarousel?.length !== 0 && (
          <Carousel
            withControls={false}
            withIndicators
            height={200}
            slideSize={{ base: "100%", md: "33%" }}
            slideGap={{ base: 0, sm: "md" }}
            loop
            align={"start"}
            plugins={[autoplaySplitAds.current]}
            onMouseEnter={autoplaySplitAds.current.stop}
            onMouseLeave={autoplaySplitAds.current.reset}
          >
            {splitCarousel?.map((item: any, index: number) => (
              <Carousel.Slide key={index}>
                <Image
                  src={item?.image}
                  alt={`ads`}
                  className="h-[200px] cursor-pointer"
                  onClick={() => (item?.link ? redirect(item?.link) : () => {})}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
        <br />

        <Carousel
          withControls={false}
          align={"start"}
          slideSize={{ base: "11,1%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          // plugins={[autoplaySubCategories.current]}
          // onMouseEnter={autoplaySubCategories.current.stop}
          // onMouseLeave={autoplaySubCategories.current.reset}
        >
          {isLoadingSubCt &&
            Array.from({ length: 14 }, (_, index) => (
              <Carousel.Slide key={index}>
                <Skeleton
                  className="shrink-0 h-[80px] md:h-[100px] w-[80px] md:w-[100px] !m-0"
                  circle
                  mb={"xl"}
                />
              </Carousel.Slide>
            ))}
          {!isLoadingSubCt &&
            subCategories?.map((item: any, index: number) => (
              <Carousel.Slide key={index}>
                <Link
                  className="no-underline text-[black]"
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
              </Carousel.Slide>
            ))}
        </Carousel>

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
      <div className="w-full flex items-center justify-center">
        <Pagination
          total={dataProducts?.totalPages}
          onChange={handleChangePage}
        />
      </div>
    </Container>
  );
}
