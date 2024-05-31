"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  InputBase,
  SimpleGrid,
} from "@mantine/core";
import defaultProfileImage from "@/assets/default-avatar.jpg";
import { Icon, ProductCard } from "@/components";
import { useGetAllFrontProductsByPaginationQuery } from "@/store";
import { ObjectToParams } from "@/utils/objectToParams";
import { LocationModal, LoginModal } from "@/modals";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices";
import { formatPhoneNumber } from "@/utils";
import { RootState } from "@/store/store";
import Head from "next/head";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);
  const user: any = useSelector((state: RootState) => state?.user?.user);
  const userLocation = useSelector((state: RootState) => state?.location?.city);
  const [opened, { close, open }] = useDisclosure();

  const [products, setProducts] = useState([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber] = useState(1);

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
    if (isErrorProducts) {
    }

    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [isErrorProducts, isSuccessProducts]);

  return (
    <Container size={"xl"}>
      <Head>
        <title>
          Мой профиль - Душанбе Маркет | Управляйте своим аккаунтом и
          настройками здесь{" "}
        </title>
        <meta
          name="description"
          content="Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!"
        />
        <meta
          name="keywords"
          content="профиль, аккаунт, настройки, история заказов, Душанбе Маркет, управление данными, безопасность"
        />

        <meta property="og:title" content="Мой профиль на Душанбе Маркет" />
        <meta
          property="og:description"
          content="Войдите в свой профиль на Душанбе Маркет, чтобы управлять вашими данными, настройками аккаунта и просматривать историю заказов. Удобство и безопасность в одном месте!"
        />
        <meta property="og:image" content="./logo.png" />
        <meta property="og:url" content="https://dushanbemarket.com/profile" />
        <meta property="og:type" content="website" />
      </Head>
      <Flex
        direction={"column"}
        gap={"lg"}
        className="p-2 md:px-[70px] md:py-10"
      >
        <div className="pt-12 relative mt-[50px] flex items-center rounded-2xl justify-center bg-[#228BE61a]">
          <Image
            src={defaultProfileImage.src}
            className="w-[100px] rounded-full h-[100px]bg-[rgb(255,255,255)] absolute top-[-50px] border-[3px] border-solid border-green"
            alt="profile"
          />
          {isAuthenticated ? (
            <h1 className="text-[18px] mb-6 mt-3">{user?.fio}</h1>
          ) : (
            <Button
              variant="light"
              color="green"
              c={"green"}
              className="text-[16px] mb-6 mt-3"
              onClick={open}
            >
              Войти
            </Button>
          )}
        </div>
        {isAuthenticated && (
          <Alert className="rounded-lg">
            <h2 className="py-4">Ваша информация</h2>
            <Grid className="flex-col md:flex-row">
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <InputBase
                  label="ФИО"
                  value={user?.fio}
                  className="w-full"
                  placeholder="ФИО"
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <InputBase
                  label="Электронная почта"
                  value={user?.email}
                  className="w-full"
                  placeholder="Электронная почта"
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <InputBase
                  label="Номер телефона"
                  value={formatPhoneNumber(user?.phone_number)}
                  className="w-full"
                  placeholder="Номер телефона"
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <InputBase
                  label="Адрес"
                  value={user?.address}
                  className="w-full"
                  placeholder="Адрес"
                  readOnly
                />
              </Grid.Col>
            </Grid>
            <h2 className="py-4">Расположение</h2>
            <Grid>
              <Grid.Col span={{ sm: 12, md: 12 }}>
                <Button
                  bg={"green"}
                  justify="space-between"
                  rightSection={<Icon name="location" />}
                  className="w-full"
                  onClick={modalOpen}
                >
                  {userLocation}
                </Button>
              </Grid.Col>
            </Grid>

            <h2 className="py-4">Заказы</h2>

            <Grid className="flex-col md:flex-row">
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <Button
                  bg={"green"}
                  justify="space-between"
                  rightSection={<Icon name="shippingExpress" />}
                  className="w-full"
                  onClick={() => window.location.replace("active-orders")}
                >
                  Активные заказы
                </Button>
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 6 }}>
                <Button
                  bg={"green"}
                  justify="space-between"
                  rightSection={<Icon name="shippingEconomy" />}
                  className="w-full"
                  onClick={() => window.location.replace("completed-orders")}
                >
                  Завершенные заказы
                </Button>
              </Grid.Col>
            </Grid>
            <br />
            <Button
              color={"green"}
              variant="outline"
              className="w-full"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Alert>
        )}

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
      </Flex>

      <LoginModal onClose={close} opened={opened} />
      <LocationModal onClose={modalClose} opened={modalOpened} />
    </Container>
  );
}
