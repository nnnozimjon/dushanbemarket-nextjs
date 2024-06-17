import {
  useGetAllFrontProductsByPaginationQuery,
  useGetProductByIdQuery,
} from "@/store";
import { addToCart, addToWishlist, removeFromWishlist } from "@/store/slices";
import { RootState } from "@/store/store";
import { colors } from "@/utils/color";
import { ObjectToParams } from "@/utils/objectToParams";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Color {
  label: string;
  value: string;
  color: string;
}

export const ProductController = () => {
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber] = useState(1);

  const dispatch = useDispatch();
  const cart: any[] = useSelector((state: RootState) => state?.cart?.products);
  const wishlist: any[] = useSelector(
    (state: RootState) => state?.wishlist?.products
  );

  const { id }: any = useParams();

  const { data, isLoading, isError, isSuccess, error } =
    useGetProductByIdQuery(id);

  const product = data?.payload;
  const images = product?.images?.split(",");
  const sizes = product?.sizes ? product.sizes.split(",") : [];
  const colorsList = product?.colors ? product.colors.split(",") : [];

  const [selectedImage, setSelectedImage] = useState<string>("");

  const currentDate = new Date();
  const [creationDate, setCreationDate] = useState<Date>(currentDate);

  const timeDifference = currentDate?.getTime() - creationDate?.getTime();
  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
  const isWithinThreeDays = timeDifference <= threeDaysInMilliseconds;

  useEffect(() => {
    if (isError) {
      toast.warning((error as any)?.data?.message);
    }

    if (isSuccess) {
      setSelectedImage(images[0]);
      setCreationDate(new Date(product?.created_at));
    }
  }, [isSuccess, isError]);

  const isProductAddedToCart = cart?.find((product) => product?.id == id);
  const isLiked = wishlist?.find((product: any) => product?.id == id);

  const handleAddProductToCart = () => {
    toast.success("Товар добавлен в корзину!");
    dispatch(addToCart({ ...product, quantity: product.qty }));
  };

  const porudctIsInCartAlert = () => {
    toast.success("Товар уже добавлен в корзину!");
  };

  const handleLike = () => {
    dispatch(addToWishlist(product));
  };

  const handleDislike = () => {
    dispatch(removeFromWishlist(product));
  };

  const handleLikeDislike = () => {
    if (isLiked) {
      return handleDislike();
    }
    handleLike();
  };

  // more product for showing
  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({
      pageSize,
      pageNumber,
      order: "rand",
      category_id: product?.category_id || "",
      sub_category_id: product?.sub_category_id || "",
    })
  );

  function filterColors(colors: Color[], colorList: string[]): Color[] {
    return colors.filter((color) => colorList?.includes(color.value));
  }

  const filteredColors: Color[] = filterColors(colors, colorsList);

  window.scrollTo({ top: 0, behavior: "smooth" });

  return {
    isLoading,
    selectedImage,
    images,
    setSelectedImage,
    isWithinThreeDays,
    product,
    colorsList,
    filteredColors,
    sizes,
    isProductAddedToCart,
    handleAddProductToCart,
    porudctIsInCartAlert,
    handleLikeDislike,
    isLiked,
    dataProducts,
    isLoadingProducts
  };
};
