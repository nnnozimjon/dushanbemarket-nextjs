import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";
import { ObjectToParams } from "@/utils/objectToParams";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CategoryController = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const category_name = urlSearchParams.get("name");
  const params = useParams();

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
      order: "desc",
      category_id: params?.id,
    })
  );

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery(params?.id);

  useEffect(() => {
    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [isSuccessProducts, isErrorProducts, dataProducts?.payload]);

  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt, dataCt?.payload]);

  useEffect(() => {
    refetchProducts();
  }, [pageNumber, pageSize, refetchProducts]);

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return {
    isLoadingCt,
    categories,
    category_name,
    isLoadingProducts,
    products,
    dataProducts,
    handleChangePage,
  };
};
