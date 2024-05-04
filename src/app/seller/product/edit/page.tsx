"use client";

import React, { useEffect, useMemo, useState } from 'react'

import {
  Button,
  Checkbox,
  Image,
  InputBase,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Paper,
  Radio,
  Select,
  SimpleGrid,
  TagsInput,
  Textarea,
} from "@mantine/core";

import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Icon } from '@/components';
import { useGetAllCategoryQuery, useGetByIdQuery } from '@/store';
import { useParams } from 'react-router-dom';
import { colors } from '@/utils/color';


interface Category {
  id: number,
  name: string
  subcategories: Category[]
}

export default function ProductEdit() {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [imageSrcs, setImageSrcs] = useState<string[] | undefined>(undefined);
  
  const [isChecked, setIsChecked] = useState(false);
  const params = useParams()


  const { data, error, isError, isSuccess, isLoading } = useGetByIdQuery({
    id: params?.id,
  });

  const {
    data: dataCategory,
    isError: isErrorCategory,
    isSuccess: isSuccessCategory,
    isLoading: isLoadingCategory
  } = useGetAllCategoryQuery({})

  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    category_id: '',
    sub_category_id: '',
    brand_id: '',
    model_id: '',
    qty: '',
    colors: [],
    sizes: [],
    gender: '',
    price: '',
    price_in_friday: '',
    shipping: '',
  })

  const colorsKey = useMemo(() => Math.random().toString(), [productDetails?.colors])
  const sizesKey = useMemo(() => Math.random().toString(), [productDetails?.sizes])

  const handleDeleteImage = (index: number) => {
    const newFiles = files ? [...files] : [];
    const newImageSrcs = imageSrcs ? [...imageSrcs] : [];

    newFiles.splice(index, 1);
    newImageSrcs.splice(index, 1);

    setFiles(newFiles);
    setImageSrcs(newImageSrcs);
  };

  const updateProductDetails = (
    key: string,
    value: any
  ) => {
    setProductDetails((prevProductDetails: any) => ({
      ...prevProductDetails,
      [key]: value,
    }));
  };

  const handleDropzoneChange = (files: File[]) => {
    if (files.length > 0) {
      const filesToProcess = files.slice(0, 5); // Take the first 5 files
      setFiles(filesToProcess);
      const imageSrcs: string[] = [];

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imageSrcs.push(reader.result as string);
          // Check if all images have been read
          if (imageSrcs.length === filesToProcess.length) {
            // Set the state with the array of image URLs
            setImageSrcs(imageSrcs);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFiles([]);
      setImageSrcs([]);
    }
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const sortToSelect = (category: Category[]) => {
    return category?.map((category: Category) => {
      return {
        label: category?.name,
        value: String(category?.id)
      }
    })
  }

  const subCategories = dataCategory?.payload?.find((cat: Category) => cat?.id == Number(productDetails.category_id))?.subcategories
  const sortedCategory = sortToSelect(dataCategory?.payload)
  const sortedSubCategories = sortToSelect(subCategories);

  const sortedCategoryKey = useMemo(() => Math.random().toString(), [sortedCategory])
  const sortedSubCategoryKey = useMemo(() => Math.random().toString(), [sortedSubCategories])
  const priceKey = useMemo(() => Math.random().toString(), [productDetails?.price])
  const price_in_fridayKey = useMemo(() => Math.random().toString(), [productDetails?.price_in_friday])
  const qtyKey = useMemo(() => Math.random().toString(), [productDetails?.qty])


  useEffect(() => {

    if (isError) {

    }

    if (isSuccess) {
      const product = data?.payload;
      const sizes = product?.sizes?.split(',')
      const colors = product?.colors?.split(',')


      setProductDetails({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        qty: product?.qty,
        brand_id: '',
        category_id: String(product?.category_id),
        colors: colors,
        gender: '',
        model_id: '',
        price_in_friday: product?.price_in_friday,
        shipping: product?.shipping,
        sizes: sizes,
        sub_category_id: String(product?.sub_category_id),
      })
      const images = product?.images?.split(',')
      setImageSrcs(images)
      setIsChecked(product?.shipping === 'free' ? true : false)
    }

  }, [isError, isSuccess])


  console.log(imageSrcs)
  console.log(files)


  return (
    <div className="w-full">
      <h1 className="text-[20px]">Создать продукт</h1>
      <br />
      <Paper className="p-2 md:p-4" shadow="xs" radius={"lg"}>
        <InputBase
          withAsterisk
          label="Название продукта"
          placeholder="Название продукта"
          classNames={{ input: "h-[50px] rounded-[16px]" }}
          defaultValue={productDetails?.name}
          onChange={(e) => updateProductDetails('name', e.target.value)}
        />
        <Textarea
          withAsterisk
          label="Описание"
          placeholder="Описание"
          classNames={{ input: "h-[130px] rounded-[16px]" }}
          defaultValue={productDetails?.description}
          onChange={(e) => updateProductDetails('description', e.target.value)}
        />
        <br />
        {/* IMAGE */}
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 4, md: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {imageSrcs !== undefined &&
            imageSrcs?.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  src={image}
                  alt="Preview"
                  className="w-full mb-2 rounded-lg"
                />
                <div className="absolute top-2 right-2 w-[30px] h-[30px] bg-[#fff] flex justify-center items-center shadow-md rounded-full">
                  <Icon onClick={() => handleDeleteImage(index)} name="delete" className="text-[red] p-1 cursor-pointer" />
                </div>
              </div>
            ))}
        </SimpleGrid>
        {files?.length !== 5 && <Dropzone
          className="border border-solid rounded-2xl border-[rgba(0,0,0,0.1)]"
          onDrop={handleDropzoneChange}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div className="mt-0 pt-0">
              <Text size="xl" inline className="p-0 m-0 text-center">
                Нажмите, чтобы выбрать изображения
              </Text>
              <Text size="sm" c="dimmed" inline className="text-center">
                Вы можете прикрепить максимум 5 изображений размером не более 5 МБ.
              </Text>
            </div>
          </Group>
        </Dropzone>}
        {/* END OF IMAGE */}
      </Paper>
      <br />
      <Paper className="p-2 md:p-4" shadow="xs" radius={"lg"}>
        <SimpleGrid
          cols={{ base: 1, sm: 1, lg: 2, md: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <Select withAsterisk key={sortedCategoryKey} defaultValue={productDetails?.category_id} onChange={(e) => {
            updateProductDetails('category_id', e)
            updateProductDetails('sub_category_id', '')
          }} data={sortedCategory} label="Категория" placeholder="Категория" classNames={{ input: "h-[50px] rounded-[16px]" }} />
          {productDetails?.category_id && <Select key={sortedSubCategoryKey} defaultValue={productDetails?.sub_category_id} onChange={(e) => updateProductDetails('sub_category_id', e)} data={sortedSubCategories} label="Подкатегория" placeholder="Подкатегория" classNames={{ input: "h-[50px] rounded-[16px]" }} />}
          {/* <InputBase label="Бренд" placeholder="Бренд" classNames={{ input: "h-[50px] rounded-[16px]" }} /> */}
          {/* <InputBase label="Модель" placeholder="Модель" classNames={{ input: "h-[50px] rounded-[16px]" }} /> */}
          <NumberInput key={qtyKey} withAsterisk defaultValue={productDetails?.qty} min={0} onChange={(e) => updateProductDetails('qty', e)} label="Количество" placeholder="Количество" classNames={{ input: "h-[50px] rounded-[16px]", controls: 'hidden' }} />
          <MultiSelect data={colors} key={colorsKey} defaultValue={productDetails?.colors} label="Цвет" placeholder="Цвет" classNames={{ input: "min-h-[50px] rounded-[16px]" }} onChange={(e) => updateProductDetails('colors', e)} />
          <TagsInput key={sizesKey} defaultValue={productDetails?.sizes} onChange={(e) => updateProductDetails('sizes', e)} label="Нажмите Enter, чтобы добавить размер" placeholder="Например 37, 38, 39, 40 или m, xl, 2xl..." classNames={{ input: "h-[50px] rounded-[16px]" }} />
        </SimpleGrid>
        <br />
        {/* <Radio.Group label="Для" description="Не обязательно" onChange={(e) => updateProductDetails('gender', e)}>
          <Group mt="xs">
            <Radio value="men" label="Мужчины" />
            <Radio value="women" label="Женщины" />
            <Radio value="kids" label="Дети" />
            <Radio value="other" label="Другое" />
          </Group>
        </Radio.Group> */}
      </Paper>
      <br />
      <Paper className="p-2 md:p-4" shadow="xs" radius={"lg"}>
        <NumberInput key={priceKey} withAsterisk defaultValue={Number(productDetails?.price)} min={0} label="Цена" placeholder="Цена" onChange={(e) => updateProductDetails('price', e)} classNames={{ input: "h-[50px] rounded-[16px]", controls: 'hidden' }} />
        <NumberInput key={price_in_fridayKey} defaultValue={Number(productDetails?.price_in_friday)} min={0} label="Цена в пятницу" placeholder="Цена в пятницу" onChange={(e) => updateProductDetails('price_in_friday', e)} classNames={{ input: "h-[50px] rounded-[16px]", controls: 'hidden' }} />
        <br />
        <Checkbox checked={isChecked} label="Бесплатная доставка" onChange={handleCheckboxChange} />
        {!isChecked && <NumberInput defaultValue={productDetails?.shipping} min={0} placeholder="Доставка" onChange={(e) => updateProductDetails('shipping', e)} className="pt-4" classNames={{ input: 'h-[50px] rounded-[16px]', controls: 'hidden' }} />}
      </Paper>
      {!isLoading && <Button
        disabled={isLoading}
        onClick={() => { }}
        className="my-4 p-4 w-full h-[50px] rounded-[16px]"
        color="green"
      >
        Добавить продукт
      </Button>}
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'green', type: 'oval' }} />
    </div>
  )
}
