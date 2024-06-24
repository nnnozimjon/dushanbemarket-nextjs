"use client";

import React from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Flex,
  Image,
  LoadingOverlay,
  Pill,
  Rating,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import { Icon, ProductCard } from "@/components";
import { ProductController } from "@/controllers/ProductController";

export default function ProductPage() {
  const {
    colorsList,
    dataProducts,
    filteredColors,
    handleAddProductToCart,
    handleLikeDislike,
    images,
    isLiked,
    isLoading,
    isLoadingProducts,
    isProductAddedToCart,
    isWithinThreeDays,
    porudctIsInCartAlert,
    product,
    selectedImage,
    setSelectedImage,
    sizes,
  } = ProductController();

  return (
    <Container size={"xl"} className="p-2 md:py-10 ">
      <Flex
        gap={"lg"}
        justify={"space-between"}
        className="flex-col lg:flex-row w-full"
      >
        <div className="w-full">
          {!isLoading ? (
            <Image
              src={selectedImage}
              alt=""
              className="h-[300px] object-contain md:h-[500px] w-full bg-[rgba(0,0,0,0.1)] mt-4 mb-4 rounded-xl"
            />
          ) : (
            <Skeleton
              className="h-[300px] md:h-[500px] w-full mt-4 mb-4"
              radius="xl"
            />
          )}
          <SimpleGrid
            cols={{ base: 5, sm: 5, lg: 5, md: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {images !== undefined &&
              images?.map((image: any, index: number) => (
                <Image
                  key={index}
                  src={image}
                  alt="Preview"
                  className={`mb-2 h-[80px] object-contain w-[80px] rounded-lg cursor-pointer ${image === selectedImage && "border-3 p-1 border-green border-solid"}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </SimpleGrid>
        </div>
        {/* second part */}
        <div className="w-full pt-[20px]">
          {isWithinThreeDays && (
            <Badge variant="light" size="lg">
              Новинки
            </Badge>
          )}
          <h1 className="text-[20px] font-semibold w-full md:w-[400px]">
            {product?.name}
          </h1>
          <Rating
            title="Review"
            className="my-3"
            size={"lg"}
            value={0}
            color="green"
            readOnly
          />
          <Alert
            color="green"
            title="Цена"
            className="p-[10px] w-full md:w-[400px] mt-4 mb-4"
          >
            <h1 className="text-green font-medium">
              {Number(product?.price).toFixed(2)} c
            </h1>
          </Alert>
          <hr className="w-full md:w-[400px]" />

          {colorsList?.length !== 0 && (
            <Flex
              gap={"lg"}
              align={"center"}
              justify={"space-between"}
              className="w-full md:w-[400px]"
            >
              <div>
                <Text className="p-0 m-0 font-semibold">Цвета</Text>
              </div>
              <Flex gap={"sm"}>
                {filteredColors?.map((color, index) => (
                  <div
                    key={index}
                    className={`h-[20px] w-[20px]  my-4 rounded-full cursor-pointer`}
                    style={{ backgroundColor: color?.color }}
                  />
                ))}
              </Flex>
            </Flex>
          )}

          {sizes?.length !== 0 && (
            <Flex
              gap={"lg"}
              align={"center"}
              justify={"space-between"}
              className="w-full md:w-[400px] mb-2"
            >
              <div>
                <Text className="p-0 m-0 font-semibold">Размеры</Text>
              </div>
              <Flex gap={"md"}>
                {sizes?.map((size: string, index: number) => (
                  <Pill key={index}>{size}</Pill>
                ))}
              </Flex>
            </Flex>
          )}

          <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Доставка</Text>
            </div>
            <Flex gap={"lg"}>
              <Text>{"от 10с - 25с"}</Text>
              <Icon name="shippingCargo" className="text-[#13CE66]" />
            </Flex>
          </Flex>
          <br />
          {sizes?.length !== 0 && <hr className="w-full md:w-[400px]" />}
          <Flex className="w-full md:w-[400px]" align={"center"} gap={"lg"}>
            <Button
              className="h-[50px] w-full md:w-[400px] text-[18px]"
              bg={"green"}
              rightSection={<Icon name={"buy"} variant="outline" />}
              onClick={
                !isProductAddedToCart
                  ? handleAddProductToCart
                  : porudctIsInCartAlert
              }
            >
              В корзину
            </Button>
            <Button
              color="green"
              variant="outline"
              onClick={handleLikeDislike}
              className="!h-[50px] !w-[80px] text-[18px] my-4 p-0"
            >
              <Icon name="heart" variant={!!isLiked ? "primary" : "outline"} />
            </Button>
          </Flex>
        </div>
      </Flex>
      {product?.description && (
        <Alert
          title="Описание"
          c={"green"}
          color="green"
          className="w-full mt-4 mb-4"
        >
          {product?.description}
        </Alert>
      )}

      <br />
      {dataProducts?.payload && <h1 className="my-4">Похожие товары</h1>}
      <SimpleGrid
        cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {dataProducts?.payload?.map((item: any, index: number) => (
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
      <LoadingOverlay
        visible={isLoading && isLoadingProducts}
        zIndex={1000}
        className="h-screen w-screen fixed overflow-hidden scrollbar-hide"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </Container>
  );
}
