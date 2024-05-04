"use client"
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Rating,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
} from '@mantine/core';
import { Counter, Icon, ProductCard } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { useGetAllFrontProductsByPaginationQuery, useGetProductByIdQuery } from '@/store';
import { addToCart, addToWishlist, removeFromWishlist, removeProductById } from '@/store/slices';
import { ObjectToParams } from '@/utils/objectToParams';
import { colors } from "@/utils/color";
import { toast } from 'react-toastify';
import { RootState } from '@/store/store';


interface Color {
  label: string;
  value: string;
  color: string;
}

export default function ProductPage() {
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber] = useState(1);


  const dispatch = useDispatch()
  const cart: any[] = useSelector((state: RootState) => state?.cart?.products)
  const wishlist: any[] = useSelector((state: RootState) => state?.wishlist?.products)


  const { id }: any = useParams()

  const { data, isLoading, isError, isSuccess, error } =
    useGetProductByIdQuery(id)

  const product = data?.payload
  const images = product?.images?.split(',')
  const sizes = product?.sizes ? product.sizes.split(',') : [];
  const colorsList = product?.colors ? product.colors.split(',') : [];

  const [selectedImage, setSelectedImage] = useState<string>('')
  
  const currentDate = new Date()
  const [creationDate, setCreationDate] = useState<Date>(currentDate);

  const timeDifference = currentDate?.getTime() - creationDate?.getTime()
  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
  const isWithinThreeDays = timeDifference <= threeDaysInMilliseconds;


  useEffect(() => {
    if (isError) {
      toast.warning((error as any)?.data?.message)
    }

    if (isSuccess) {
      setSelectedImage(images[0])
      setCreationDate(new Date(product?.created_at))
    }
  }, [isSuccess, isError])



  const isProductAddedToCart = cart?.find((product) => product?.id == id)
  const isLiked = wishlist?.find((product: any) => product?.id == id)


  const handleAddProductToCart = () => {
    toast.success('Товар добавлен в корзину!')
    dispatch(addToCart({ ...product, quantity: product.qty }))
  }

  const porudctIsInCartAlert = () => {
    toast.success('Товар уже добавлен в корзину!')
  }

  const handleLike = () => {
    dispatch(addToWishlist(product))
  }

  const handleDislike = () => {
    dispatch(removeFromWishlist(product))
  }

  const handleLikeDislike = () => {
    if (isLiked) {
      return handleDislike()
    }
    handleLike()
  }


  // more product for showing
  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({ pageSize, pageNumber, order: 'rand', category_id: product?.category_id || '', sub_category_id: product?.sub_category_id || '' })
  );


  function filterColors(colors: Color[], colorList: string[]): Color[] {
    return colors.filter(color => colorList?.includes(color.value));
  }

  const filteredColors: Color[] = filterColors(colors, colorsList);


  window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Container size={'xl'} className="p-2 md:py-10 ">
      <Flex gap={'lg'} justify={'space-between'} className="flex-col lg:flex-row w-full">
        <div className="w-full">
          {!isLoading ? <img
            src={selectedImage}
            alt=""
            className="h-[300px] object-contain md:h-[500px] w-full bg-[rgba(0,0,0,0.1)] mt-4 mb-4 rounded-xl"
          />
            :
            <Skeleton className="h-[300px] md:h-[500px] w-full mt-4 mb-4" radius="xl" />}
          <SimpleGrid
            cols={{ base: 5, sm: 5, lg: 5, md: 5 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            {images !== undefined &&
              images?.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt="Preview"
                  className={`w-full mb-2 rounded-lg cursor-pointer ${image === selectedImage && 'border-3 p-1 border-green border-solid'}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </SimpleGrid>
        </div>
        {/* second part */}
        <div className="w-full pt-[20px]">
        {isWithinThreeDays && <Badge variant='light' size='lg'>Новинки</Badge>}
          <h1 className="text-[20px] font-semibold w-full md:w-[400px]">
            {product?.name}
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
            <h1 className="text-green font-medium">{Number(product?.price).toFixed(2)} c</h1>
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
            <Select placeholder="Размер" data={sizes} className="w-[100px]" />
          </Flex>}
          {sizes?.length !== 0 && <hr className="w-full md:w-[400px]" />}

          {/* <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Количество</Text>
            </div>
            <Counter qty={product?.qty} />
          </Flex> */}

          {/* <Flex
            gap={"lg"}
            align={"center"}
            justify={"space-between"}
            className="w-full md:w-[400px]"
          >
            <div>
              <Text className="p-0 m-0 font-semibold">Доставка</Text>
            </div>
            <Flex gap={'lg'}>
              <Text>{product?.shipping == 'free' ? 'Бесплатно' : Number(product?.shipping)?.toFixed(2) + ' c'}</Text>
              <Icon name="shippingCargo" className="text-[#13CE66]" />
            </Flex>
          </Flex> */}

          <Flex className="w-full md:w-[400px]" align={'center'} gap={'lg'}>
            <Button
              className="h-[50px] w-full md:w-[400px] text-[18px]"
              bg={'green'}
              rightSection={<Icon name={"buy"} variant="outline" />}
              onClick={!isProductAddedToCart ? handleAddProductToCart : porudctIsInCartAlert}
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
      {product?.description && <Alert
        title="Описание"
        c={'green'}
        color="green"
        className="w-full mt-4 mb-4"
      >
        {product?.description}
      </Alert>}

      <br />
      {dataProducts?.payload && <h1 className='my-4'>Похожие товары</h1>}
      <SimpleGrid
        cols={{ base: 2, lg: 5, md: 4, sm: 3 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}>
        {dataProducts?.payload?.map((item: any, index: number) =>
          <ProductCard key={index} id={item?.id} img={item?.images} name={item?.name} price={item?.price} created_by={item?.created_by} storeName={item?.storeName} />
        )}
      </SimpleGrid>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'green', type: 'oval' }} />
    </Container>
  );
};
