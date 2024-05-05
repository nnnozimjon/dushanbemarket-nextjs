import React from "react";
import { Container, Flex, Image, Text } from "@mantine/core";
import empty from "@/assets/empty-cart.png";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="md:pt-[50px]">
      <Container size={"xl"}>
        <Flex
          direction={"column"}
          gap={"lg"}
          className="w-full h-[600px]"
          align={"center"}
          justify={"center"}
        >
          <Image
            src={empty?.src}
            alt=""
            className="h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]"
          />
          <Flex direction={"column"} align={"center"}>
            <Text className="text-[#212121] font-bold text-[28px]">
              Страница не найдена
            </Text>
            <Link href={'/'} className="no-underline text-green text-[18px]">Вернуться на главную страницу</Link>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default NotFoundPage;
