import { useGetAllFrontProductsByPaginationQuery } from "@/store";
import { RootState } from "@/store/store";
import { ObjectToParams } from "@/utils/objectToParams";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const ProfileController = () => {
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
        toast.error((errorProducts as any)?.data?.message)
    }

    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [dataProducts?.payload, errorProducts, isErrorProducts, isSuccessProducts]);
  
  return {
    isAuthenticated,
    user,
    open,
    modalOpen,
    userLocation,
    dispatch,
    products,
    isLoadingProducts,
    opened,
    modalClose,
    modalOpened,
  };
};
