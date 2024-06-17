"use client";

import {
  Container,
  Flex,
  Text,
  Indicator,
  Input,
  Menu,
  Grid,
  Button,
  Divider,
  NavLink,
  Group,
  SimpleGrid,
} from "@mantine/core";
import classes from "./styles.module.css";
import { AppLogo, Icon } from "..";
import Link from "next/link";
import { HeaderController, ICategory } from "@/controllers/HeaderController";

export function AppHeader() {
  const {
    cart,
    user,
    wishlist,
    setSearch,
    searchData,
    categories,
    handleMouseEnter,
    handleMouseLeave,
    isDropdownVisible,
    isScrolled,
    activeLink,
    setActiveLink,
    allCategories,
  } = HeaderController();

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
      <Grid
        visibleFrom="md"
        className={`${isScrolled && "hidden transition-all duration-300"} p-5 bg-green`}
      >
        <Container size={"lg"} className="w-full">
          <Flex gap={"lg"} align={"center"} justify={"center"}>
            <Button
              variant="transparent"
              c="white"
              className="!p-0 !m-0"
              onMouseEnter={() => {
                handleMouseEnter();
              }}
              leftSection={
                <Icon name={"category"} variant="outline" color="white" />
              }
            >
              Все категории
            </Button>
            {categories?.map(
              (category: Omit<ICategory, "id">, index: number) => (
                <Button
                  key={index}
                  variant="transparent"
                  c="white"
                  className="!p-0 !m-0"
                  onClick={() => window.location.replace(category?.link)}
                  leftSection={
                    <Icon
                      name={category?.icon}
                      variant="outline"
                      color="white"
                    />
                  }
                >
                  {category?.name}
                </Button>
              )
            )}
          </Flex>
        </Container>
      </Grid>
      {isDropdownVisible && (
        <Flex
          visibleFrom="md"
          onMouseLeave={handleMouseLeave}
          className="w-full bg-[white] p-5"
        >
          <Container size={"md"} className="w-full">
            <Flex gap={"sm"}>
              <div className="!w-[300px]">
                {allCategories?.map(
                  (
                    category: Omit<ICategory, "link" | "icon">,
                    index: number
                  ) => (
                    <NavLink
                      onMouseOver={() => setActiveLink(category)}
                      active={category?.id === activeLink?.id}
                      c={"black"}
                      color="gray.2"
                      key={index}
                      variant="filled"
                      label={category?.name}
                      className="rounded-lg text-[0.875rem] no-underline font-semibold text-[#212121s]"
                      href={`/category/${category?.id}`}
                    />
                  )
                )}
              </div>
              <Divider orientation="vertical" />
              <Group className="border w-full items-start px-[30px] py-[20px] flex-col">
                <Text className="text-[1.45rem] font-bold text-[#212121]">
                  {activeLink?.name}
                </Text>
                <SimpleGrid
                  className="w-full"
                  cols={{ sm: 2, lg: 3 }}
                  spacing={{ base: 10, sm: "xl" }}
                  verticalSpacing={{ base: "md", sm: "xl" }}
                >
                  {activeLink?.subCategories?.map(
                    (
                      subCategory: Omit<ICategory, "icon" | "link">,
                      index: number
                    ) => (
                      <Flex direction={"column"} key={index}>
                        <NavLink
                          className="text-[1rem] no-underline font-bold text-[#212121] hover:text-[#2A5FFE]"
                          color="none"
                          label={subCategory?.name}
                          href={
                            `/category/${subCategory?.id}?name=` +
                            subCategory?.name
                          }
                        />
                        {subCategory?.subCategories?.map(
                          (
                            sub: Omit<ICategory, "icon" | "link">,
                            index: number
                          ) => (
                            <NavLink
                              unstyled
                              key={index}
                              className="text-[1rem] no-underline text-[#212121] hover:text-[#2A5FFE] pl-[10px] cursor-pointer m-[10px_0px_0px]"
                              color="none"
                              label={sub?.name}
                              href={`/category/${sub?.id}?name=` + sub?.name}
                            />
                          )
                        )}
                      </Flex>
                    )
                  )}
                </SimpleGrid>
              </Group>
            </Flex>
          </Container>
        </Flex>
      )}
    </header>
  );
}
