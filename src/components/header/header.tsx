"use client";

import { Container, Autocomplete, Flex, Text, Indicator } from "@mantine/core";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "..";
import Link  from "next/link";
import { useSelector } from "react-redux";
import { ObjectToParams } from "@/utils/objectToParams";
import { useGetAllFrontProductsByPaginationQuery } from "@/store";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const [searchData, setSearchData] = useState<{ name: string, id: string }[]>([])
  const [search, setSearch] = useState<string>('')

  const user = useSelector((state: any) => state?.user);
  const cart = useSelector((state: any) => state?.cart);
  const wishlist = useSelector((state: any) => state?.wishlist);

  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
} = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({ pageSize: 10, pageNumber: 1, order: 'rand', name: search })
);

useEffect(() => {
  if(isErrorProducts) {

  }

  if(isSuccessProducts) {
    const mappedData = dataProducts?.payload?.map((product: any) => {
      return {
        value: String(product?.id),
        label: product?.name
      }
    })

    setSearchData(mappedData)
  }
}, [isSuccessProducts, isErrorProducts])

  return (
    <header className={`${classes.header} shadow-md fixed z-50 w-full`}>
      <Container size="md">
        <div className={classes.inner}>
          <AppLogo />
          <Autocomplete
            className={"w-full hidden lg:grid"}
            classNames={{
              input: "border border-green",
              option: "hover:bg-[#01b76220]",
            }}
            placeholder="Поиск..."
            rightSection={<Icon name="search" variant="outline" />}
            onChange={(e) => setSearch(e)}

            // @ts-ignore
            data={searchData}
            visibleFrom="xs" 
          />
          <Flex gap={"md"}>
            <Link href={"/wishlist"} className="no-underline text-[#01B763]">
              <Indicator
                inline
                processing
                size={16}
                color="green"
                classNames={{ indicator: "absolute top-[5px]" }}
                label={wishlist?.products?.length}
              >
                <Flex direction={"column"} align={"center"} justify={"center"}>
                  <Icon name="heart" variant="outline" />
                  <Text className="!p-0 !m-0 text-[12px]">Нравится</Text>
                </Flex>
              </Indicator>
            </Link>

            <Link href={"/cart"} className="no-underline text-[#01B763]">
              <Indicator
                inline
                processing
                size={16}
                color="green"
                classNames={{ indicator: "absolute top-[5px]" }}
                label={cart?.products?.length}
              >
                <Flex direction={"column"} align={"center"} justify={"center"}>
                  <Icon name="buy" variant="outline" />
                  <Text className="!p-0 !m-0 text-[12px]">Корзина</Text>
                </Flex>
              </Indicator>
            </Link>
            <Link href={"/profile"} className="no-underline text-[#01B763]">
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Icon name="profile" variant="outline" />
                <Text className="!p-0 !m-0 text-[12px]">
                  {!user?.isAuthenticated ? "Войти" : "Профиль"}
                </Text>
              </Flex>
            </Link>
          </Flex>
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
        </div>
        <Autocomplete
          className={"w-full"}
          classNames={{
            input: "border border-green",
            option: "hover:bg-[#01b76220]",
          }}
          placeholder="Search"
          rightSection={<Icon name="search" variant="outline" />}
          onChange={(e) => setSearch(e)}
          // @ts-ignore
          data={searchData}
          hiddenFrom="md"
        />
      </Container>
    </header>
  );
};
