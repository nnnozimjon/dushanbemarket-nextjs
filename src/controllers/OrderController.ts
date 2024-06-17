import { useOrderProductsMutation } from "@/store";
import { clearFullyCart } from "@/store/slices";
import { RootState } from "@/store/store";
import { phoneNumberToNumber } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const OrderController = () => {
  const [order, setOrder] = useState({
    phone_number: "",
    address: "",
    comment: "",
  });
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart);

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

  const [orderProducts, { data, error, isLoading, isError, isSuccess }] =
    useOrderProductsMutation();

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message);
    }

    if (isSuccess) {
      window.location.replace("/active-orders");
      dispatch(clearFullyCart());
    }
  }, [dispatch, error, isError, isSuccess]);

  const processOrder = () => {
    const regex = /^992/;

    const clearPhoneNumber = phoneNumberToNumber(order.phone_number);

    if (!clearPhoneNumber) {
      return toast.warning("Требуется номер телефона!");
    }

    if (!regex.test(clearPhoneNumber)) {
      return toast.warning("Номер телефона должен начинаться с 992!");
    }

    if (clearPhoneNumber.length < 12) {
      return toast.warning("Номер телефона может быть неверным!");
    }

    if (!order?.address) {
      return toast.info("Пожалуйста, укажите адрес!");
    }

    const products = cart?.products;
    const mappedProducts = products?.map((product) => {
      return {
        product_id: product?.id,
        store_id: product?.created_by,
        quantity: product?.quantity,
        size: product?.selectedOptions?.size,
        color: product?.selectedOptions?.color,
      };
    });

    orderProducts({
      phone_number: clearPhoneNumber,
      address: order.address,
      comment: order.comment,
      products: mappedProducts,
    });
  };

  return { cart, order, setOrder, sortedProducts, processOrder, isLoading };
};
