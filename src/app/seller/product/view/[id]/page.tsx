"use client"

import React, { useEffect } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Flex,
  Image,
  Rating,
  Select,
  Skeleton,
  Text,
} from "@mantine/core";
import { Counter, Icon, ProductCard } from "@/components";
import { useParams } from "react-router-dom";
import { useGetByIdQuery } from "@/store";
import { colors } from "@/utils/color";

interface Color {
  label: string;
  value: string;
  color: string;
}


export default function ViewProduct(){
  const params = useParams();

  const { data, error, isError, isSuccess, isLoading } = useGetByIdQuery({
    id: params?.id,
  });


  const productData = data?.payload;
  const images = productData?.images ? productData?.images?.split(',') : []
  const sizes = productData?.sizes ? productData.sizes.split(',') : [];
  const colorsList = productData?.colors ? productData.colors.split(',') : [];

  function filterColors(colors: Color[], colorList: string[]): Color[] {
    return colors.filter(color => colorList?.includes(color.value));
  }

  const filteredColors: Color[] = filterColors(colors, colorsList);

  console.log(productData)

  useEffect(() => {


  }, [isError, isSuccess])

  return (
    <Container size={"xl"} className="p-2 md:py-10 ">
      <Flex
        gap={"lg"}
        align={"start"}
        justify={"space-between"}
        className="flex-col lg:flex-row w-full"
      >
        <div className="w-full">
          {!isLoading ? <Image
            src={images[0]}
            alt=""
            className="h-[300px] object-contain md:h-[500px] w-full bg-[rgba(0,0,0,0.1)] mt-4 mb-4 rounded-xl"
          />
            :
            <Skeleton className="h-[300px] md:h-[500px] w-full mt-4 mb-4" radius="xl" />}
        </div>
        {/* second part */}
        <div className="w-full pt-[20px]">
          <h1 className="text-[20px] font-semibold w-full md:w-[400px]">
            {productData?.name}
          </h1>
          <Rating
            title="Review"
            className="my-3"
            size={'lg'}
            value={0}
            color="green"
            readOnly
          />
          <Alert
            color="green"
            title="Цена"
            className="p-[10px] w-full md:w-[400px] mt-4 mb-4"
          >
            <h1 className="text-green font-medium">{Number(productData?.price).toFixed(2)} c</h1>
          </Alert>
          <hr className="w-full md:w-[400px]" />

          {colorsList?.length !== 0 && <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Цвета</Text>
            </div>
            <Flex gap={"sm"}>
              {filteredColors?.map((color, index) =>
                <div key={index} className={`h-[20px] w-[20px]  my-4 rounded-full cursor-pointer`} style={{ backgroundColor: color?.color }} />
              )}
            </Flex>
          </Flex>}

          <br />
          {sizes?.length !== 0 && <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px] mb-2"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Размеры</Text>
            </div>
            <Select placeholder="Size" data={sizes} className="w-[100px]" />
          </Flex>}
          {sizes?.length !== 0 && <hr className="w-full md:w-[400px]" />}

          <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Количество</Text>
            </div>
            <Counter qty={productData?.qty} />
          </Flex>
          <br />
          <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Доставка</Text>
            </div>
            <Flex gap={'lg'}>
              <Text>{productData?.shipping == 'free' ? 'Бесплатно' : Number(productData?.shipping)?.toFixed(2) + ' c'}</Text>
              <Icon name="shippingCargo" className="text-[#13CE66]" />
            </Flex>
          </Flex>

          <Flex className="w-full md:w-[400px]" align={'center'} gap={'lg'}>
            <Button
              className="h-[50px] w-full md:w-[400px] text-[18px] disabled:text-[white]"
              bg={'green'}
              rightSection={<Icon name={"buy"} variant="outline" />}
              disabled
            >
              В корзину
            </Button>

            <Button
              color="green"
              variant="outline"
              className="!h-[50px] !w-[80px] text-[18px] my-4 p-0"
              disabled
            >
              <Icon name="heart" variant={"primary"} />
            </Button>
          </Flex>
        </div>
      </Flex>
      <Alert
        title="Описание"
        c={"green"}
        color="green"
        className="w-full mt-4 mb-4"
      >

        {productData?.description}
      </Alert>
    </Container>
  );
};
