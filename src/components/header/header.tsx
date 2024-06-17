"use client";

import {
  Container,
  Autocomplete,
  Flex,
  Text,
  Indicator,
  Group,
  AutocompleteProps,
  Input,
  Menu,
  Grid,
  Button,
} from "@mantine/core";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "..";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useProductSearchMutation } from "@/store";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { IIcons } from "../icon/icon";

interface ICategory {
  label: string;
  icon: keyof IIcons;
  link: string;
}

const categories: ICategory[] = [
  {
    label: "Все категории",
    icon: "category",
    link: ''
  },
  {
    label: "Электроника",
    icon: "camera",
    link: '/category/1?name=Электроника'
  },
  {
    label: "Аксессуары",
    icon: "airpods",
    link: '/catalog/4?name=Наушники%20и%20аудиотехника'
  },
  {
    label: "Бытовая техника",
    icon: "washing-machine",
    link: '/category/55?name=Бытовая%20техника'
  },
  {
    label: "Детские товары",
    icon: "duck",
    link: '/category/31?name=Детские%20товары'
  },
  {
    label: "Одежда",
    icon: "shirt",
    link: '/category/7?name=Одежда%20и%20обувь'
  },
  {
    label: "Скидки",
    icon: "discount",
    link: ''
  },
];

export function AppHeader() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

    useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };}, []);

  return (
    <header
      className={`${classes.header} shadow-md pb-2 md:pb-0 fixed z-50 w-full`}
    >
      <Container size="md">
        <div className={classes.inner}>
          <AppLogo />
          <Menu width={"target"} trigger="click-hover">
            <Menu.Target>
              <Input
                key={"search-md"}
                className={"w-full"}
                classNames={{
                  input: "border border-green",
                }}
                placeholder="Поиск..."
                rightSection={<Icon name="search" variant="outline" />}
                onChange={(e) => setSearch(e.target.value)}
                visibleFrom="md"
              />
            </Menu.Target>
            <Menu.Dropdown>
              {searchData?.length > 0 ? (
                searchData?.map((option: any, index: number) => (
                  <Menu.Item
                    key={index}
                    onClick={() =>
                      window.location.replace(
                        "/category/" + option?.value?.split("-")[1]
                      )
                    }
                  >
                    {(option as any)?.label}
                  </Menu.Item>
                ))
              ) : (
                <div className="h-[150px] w-full flex items-center justify-center flex-col">
                  <Text className="text-[30px]">😔</Text>
                  <Text>По запросу ничего не найдено</Text>
                </div>
              )}
            </Menu.Dropdown>
          </Menu>
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
        <Menu width={"target"} trigger="click-hover">
          <Menu.Target>
            <Input
              key={"search-sm"}
              className={"w-full"}
              classNames={{
                input: "border border-green",
              }}
              placeholder="Поиск..."
              rightSection={<Icon name="search" variant="outline" />}
              onChange={(e) => setSearch(e.target.value)}
              hiddenFrom="md"
            />
          </Menu.Target>
          <Menu.Dropdown>
            {searchData?.length > 0 ? (
              searchData?.map((option: any, index: number) => (
                <Menu.Item
                  key={index}
                  onClick={() =>
                    window.location.replace(
                      "/category/" + option?.value?.split("-")[1]
                    )
                  }
                >
                  {(option as any)?.label}
                </Menu.Item>
              ))
            ) : (
              <div className="h-[150px] w-full flex items-center justify-center flex-col">
                <Text className="text-[30px]">😔</Text>
                <Text>По запросу ничего не найдено</Text>
              </div>
            )}
          </Menu.Dropdown>
        </Menu>
      </Container>
      <Grid visibleFrom="md" className={`${isScrolled && 'hidden transition-all duration-300'} p-5 bg-green`}>
        <Container size={"lg"} className="w-full">
          <Flex gap={"lg"} align={"center"} justify={"center"}>
            {categories?.map((category: ICategory, index: number) => (
              <Button
                key={index}
                variant="transparent"
                c="white"
                className="!p-0 !m-0"
                onClick={() => window.location.replace(category?.link)}
                onMouseEnter={() => {
                  handleMouseEnter();
                  setSelectedCategory(category?.label);
                }}
                leftSection={
                  <Icon name={category?.icon} variant="outline" color="white" />
                }
              >
                {category?.label}
              </Button>
            ))}
          </Flex>
        </Container>
      </Grid>
      {isDropdownVisible && (
        <Flex
          visibleFrom="md"
          onMouseLeave={handleMouseLeave}
          className="w-full h-[400px] bg-[white] p-5"
        >
          <Container size={"md"} className="w-full">
            <Text>{selectedCategory}</Text>
          </Container>
        </Flex>
      )}
    </header>
  );
}
