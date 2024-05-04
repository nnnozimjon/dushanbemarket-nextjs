"use client"

import React, { useEffect, useState } from "react";

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

import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useCreateProductMutation, useGetAllCategoryQuery } from "@/store";
import { Group, Text, rem } from "@mantine/core";
import { Icon } from "@/components";
import { colors } from "@/utils/color";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  subcategories: Category[];
}

export default function ProductCreate() {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [imageSrcs, setImageSrcs] = useState<string[] | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category_id: "",
    sub_category_id: "",
    brand_id: "",
    model_id: "",
    qty: "",
    colors: "",
    sizes: "",
    gender: "",
    price: "",
    price_in_friday: "",
    shipping: "",
  });

  const [createProduct, { data, isError, isLoading, isSuccess, error }] =
    useCreateProductMutation();

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

  const handleCreateProduct = () => {
    const formData = new FormData();

    if (!productDetails?.name) {
      return toast.info("Требуется название продукта!");
    }

    if (!productDetails?.description) {
      return toast.info("Требуется описание товара!");
    }

    if (files == undefined) {
      return toast.info("Требуется изображение товара!");
    }

    if (!productDetails?.category_id) {
      return toast.info("Требуется категория продукта!");
    }

    if (!productDetails?.price) {
      return toast.info("Требуется цена товара!");
    }

    files.forEach((file) => {
      formData.append(`images`, file);
    });

    formData.append("name", productDetails?.name);
    formData.append("service_type", "product");
    formData.append("price", productDetails?.price);
    formData.append("description", productDetails?.description);
    formData.append("category_id", productDetails?.category_id);
    formData.append("sub_category_id", productDetails?.sub_category_id);
    formData.append("brand_id", productDetails?.brand_id);
    formData.append("model_id", productDetails?.model_id);
    formData.append("qty", productDetails?.qty);
    formData.append("colors", productDetails?.colors);
    formData.append("sizes", productDetails?.sizes);
    formData.append("gender", productDetails?.gender);
    formData.append("price_in_friday", productDetails?.price_in_friday);
    formData.append("shipping", isChecked ? "free" : productDetails?.shipping);
    formData.append("status", "active");

    createProduct(formData);
  };

  const handleDeleteImage = (index: number) => {
    const newFiles = files ? [...files] : [];
    const newImageSrcs = imageSrcs ? [...imageSrcs] : [];

    newFiles.splice(index, 1);
    newImageSrcs.splice(index, 1);

    setFiles(newFiles);
    setImageSrcs(newImageSrcs);
  };

  const {
    data: dataCategory,
    isError: isErrorCategory,
    isSuccess: isSuccessCategory,
    isLoading: isLoadingCategory,
  } = useGetAllCategoryQuery({});

  const updateProductDetails = (key: string, value: any) => {
    setProductDetails((prevProductDetails: any) => ({
      ...prevProductDetails,
      [key]: value,
    }));
  };

  const sortToSelect = (category: Category[]) => {
    return category?.map((category: Category) => {
      return {
        label: category?.name,
        value: String(category?.id),
      };
    });
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const subCategories = dataCategory?.payload?.find(
    (cat: Category) => cat?.id == Number(productDetails.category_id)
  )?.subcategories;

  const sortedCategory = sortToSelect(dataCategory?.payload);
  const sortedSubCategories = sortToSelect(subCategories);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message);
    }
    if (isSuccess) {
      toast?.success(data?.message);
      window.location.reload();
    }
  }, [isError, isSuccess]);

  return (
    <div className="w-full">
      <h1 className="text-[20px]">Создать продукт</h1>
      <br />
      <Paper className="p-2 md:p-4" shadow="xs" radius={"lg"}>
        <InputBase
          label="Название продукта"
          placeholder="Название продукта"
          classNames={{ input: "h-[50px] rounded-[16px]" }}
          onChange={(e) => updateProductDetails("name", e.target.value)}
        />
        <Textarea
          label="Описание"
          placeholder="Описание"
          classNames={{ input: "h-[130px] rounded-[16px]" }}
          onChange={(e) => updateProductDetails("description", e.target.value)}
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
                  <Icon
                    onClick={() => handleDeleteImage(index)}
                    name="delete"
                    className="text-[red] p-1 cursor-pointer"
                  />
                </div>
              </div>
            ))}
        </SimpleGrid>
        {files?.length !== 5 && (
          <Dropzone
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
                  Вы можете прикрепить максимум 5 изображений размером не более
                  5 МБ.
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
        {/* END OF IMAGE */}
      </Paper>
      <br />
      <Paper className="p-2 md:p-4" shadow="xs" radius={"lg"}>
        <SimpleGrid
          cols={{ base: 1, sm: 1, lg: 2, md: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <Select
            onChange={(e) => updateProductDetails("category_id", e)}
            data={sortedCategory}
            label="Категория"
            placeholder="Категория"
            classNames={{ input: "h-[50px] rounded-[16px]" }}
          />
          {productDetails?.category_id && (
            <Select
              onChange={(e) => updateProductDetails("sub_category_id", e)}
              data={sortedSubCategories}
              label="Подкатегория"
              placeholder="Подкатегория"
              classNames={{ input: "h-[50px] rounded-[16px]" }}
            />
          )}
          {/* <InputBase label="Бренд" placeholder="Бренд" classNames={{ input: "h-[50px] rounded-[16px]" }} /> */}
          {/* <InputBase label="Модель" placeholder="Модель" classNames={{ input: "h-[50px] rounded-[16px]" }} /> */}
          <NumberInput
            min={0}
            onChange={(e) => updateProductDetails("qty", e)}
            label="Количество"
            placeholder="Количество"
            classNames={{
              input: "h-[50px] rounded-[16px]",
              controls: "hidden",
            }}
          />
          <MultiSelect
            data={colors}
            label="Цвет"
            placeholder="Цвет"
            classNames={{ input: "min-h-[50px] rounded-[16px]" }}
            onChange={(e) => updateProductDetails("colors", e)}
          />
          <TagsInput
            onChange={(e) => updateProductDetails("sizes", e)}
            label="Нажмите Enter, чтобы добавить размер"
            placeholder="Например 37, 38, 39, 40 или m, xl, 2xl..."
            classNames={{ input: "h-[50px] rounded-[16px]" }}
          />
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
        <NumberInput
          min={0}
          label="Цена"
          placeholder="Цена"
          onChange={(e) => updateProductDetails("price", e)}
          classNames={{ input: "h-[50px] rounded-[16px]", controls: "hidden" }}
        />
        <NumberInput
          min={0}
          label="Цена в пятницу"
          placeholder="Цена в пятницу"
          onChange={(e) => updateProductDetails("price_in_friday", e)}
          classNames={{ input: "h-[50px] rounded-[16px]", controls: "hidden" }}
        />
        <br />
        <Checkbox label="Бесплатная доставка" onChange={handleCheckboxChange} />
        {!isChecked && (
          <InputBase
            min={0}
            type="number"
            placeholder="Доставка"
            className="pt-4"
            classNames={{ input: "h-[50px] rounded-[16px]" }}
          />
        )}
      </Paper>
      {!isLoading && (
        <Button
          disabled={isLoading}
          onClick={handleCreateProduct}
          className="my-4 p-4 w-full h-[50px] rounded-[16px]"
          color="green"
        >
          Добавить продукт
        </Button>
      )}
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "green", type: "oval" }}
      />
    </div>
  );
}
