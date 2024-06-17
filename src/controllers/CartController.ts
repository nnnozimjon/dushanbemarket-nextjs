import {
  addToCart,
  removeFromCart,
  updateSelectedOptions,
} from "@/store/slices";
import { RootState } from "@/store/store";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Color {
  label: string;
  value: string;
  color: string;
}

export const CartController = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state?.user?.isAuthenticated
  );
  const [opened, { close, open }] = useDisclosure();

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart);

  const increaseProductQty = (product: any) => {
    dispatch(addToCart(product));
  };

  const decreaseProductQty = (product: any) => {
    dispatch(removeFromCart(product?.id));
  };

  const updateProductOptions = (productId: number, selectedOptions: any) => {
    dispatch(updateSelectedOptions({ productId, selectedOptions }));
  };

  function groupProductsByCreatedBy(products: any) {
    const groupedProducts: any = {};

    products.forEach((product: any) => {
      const { created_by, storeName, ...productData } = product;
      if (!groupedProducts[created_by]) {
        groupedProducts[created_by] = { created_by, storeName, products: [] };
      }
      groupedProducts[created_by].products.push(productData);
    });

    return Object.values(groupedProducts);
  }

  const sortedProducts = groupProductsByCreatedBy(cart?.products);

  function filterColors(colors: Color[], colorList: string[]): Color[] {
    return colors.filter((color) => colorList?.includes(color.value));
  }

  const completeOrder = () => {
    if (!isAuthenticated) {
      return open();
    }

    const products = cart?.products;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // Check if the product has colors
      if (product.colors && !product.selectedOptions?.color) {
        return toast.info("Пожалуйста, выберите цвет товара");
      }

      // Check if the product has sizes
      if (product.sizes && !product.selectedOptions?.size) {
        return toast.info("Пожалуйста, выберите размер товара");
      }
    }

    window.location.replace("/order");
  };

  return {
    cart,
    sortedProducts,
    increaseProductQty,
    decreaseProductQty,
    updateProductOptions,
    filterColors,
    completeOrder,
    opened,
    close
  };
};
