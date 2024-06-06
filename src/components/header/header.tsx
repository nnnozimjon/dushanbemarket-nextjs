"use client";

import {
  Container,
  Autocomplete,
  Flex,
  Text,
  Indicator,
  Group,
  AutocompleteProps,
} from "@mantine/core";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "..";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ObjectToParams } from "@/utils/objectToParams";
import { useProductSearchMutation } from "@/store";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";

export default function AppHeader() {
  const [searchData, setSearchData] = useState<{ name: string; id: string }[]>(
    []
  );
  const [search, setSearch] = useState<string>("");

  const user = useSelector((state: RootState) => state?.user);
  const cart = useSelector((state: RootState) => state?.cart);
  const wishlist = useSelector((state: RootState) => state?.wishlist);

  const [findProduct, { data, isSuccess, isLoading, isError, error }] =
    useProductSearchMutation();

  const useDebouncedEffect = (
    callback: () => void,
    delay: number,
    dependencies: any[]
  ): void => {
    useEffect(() => {
      const handler = setTimeout(callback, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [...dependencies, delay]);
  };

  useDebouncedEffect(
    () => {
      findProduct(search);
    },
    1000,
    [search]
  );

  useEffect(() => {
    if (isSuccess) {
      setSearchData(
        data?.payload?.map((item: any, index: string) => {
          return {
            label: item?.name,
            value: index + "-" + String(item?.category_id),
          };
        })
      );
    }
  }, [isSuccess, isError]);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Group
      gap="sm"
      className="w-full"
      onClick={() =>
        window.location.replace("/category/" + option?.value?.split("-")[1])
      }
    >
      <Text size="sm" className="w-full">
        {(option as any)?.label}
      </Text>
    </Group>
  );

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
            renderOption={renderAutocompleteOption}
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
          renderOption={renderAutocompleteOption}
        />
      </Container>
    </header>
  );
}
