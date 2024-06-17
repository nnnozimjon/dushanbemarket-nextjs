import {
  useGetAllFrontProductsByPaginationQuery,
  useGetAllWidgetsQuery,
} from "@/store";
import { ObjectToParams } from "@/utils/objectToParams";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

interface CarouselBanners {
  id: number;
  image: string;
  category_id: number;
  name: string;
  ct: {
    name: string;
  };
}

export const HomeController = () => {
  const autoplayCategories = useRef(Autoplay({ delay: 1000 }));
  const autoplayBannerAds = useRef(Autoplay({ delay: 4000 }));
  const autoplaySplitAds = useRef(Autoplay({ delay: 3000 }));
  const autoplayBannerAds2 = useRef(Autoplay({ delay: 4000 }));
  const autoplaySubCategories = useRef(Autoplay({ delay: 1000 }));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [bannerCarousel, setBannerCarousel] = useState<CarouselBanners[]>([]);
  const [splitCarousel, setSplitCarousel] = useState<CarouselBanners[]>([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: dataCt,
    isError: isErrorCt,
    isSuccess: isSuccessCt,
    isLoading: isLoadingCt,
    error: errorCt,
  } = useGetAllWidgetsQuery("home-ct");

  const {
    data: dataSubCt,
    isError: isErrorSubCt,
    isSuccess: isSuccessSubCt,
    isLoading: isLoadingSubCt,
    error: errorSubCt,
  } = useGetAllWidgetsQuery("home-sub-ct");

  const {
    data: dataCarousel,
    isError: isErrorCarousel,
    isSuccess: isSuccessCarousel,
    isLoading: isLoadingCarousel,
    error: errorCarousel,
  } = useGetAllWidgetsQuery("home-carousel");

  const {
    data: dataSplitCarousel,
    isError: isErrorSplitCarousel,
    isSuccess: isSuccessSplitCarousel,
    isLoading: isLoadingSplitCarousel,
    error: errorSplitCarousel,
  } = useGetAllWidgetsQuery("home-split-carousel");

  const {
    data: dataProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetAllFrontProductsByPaginationQuery(
    ObjectToParams({ pageSize, pageNumber, order: "desc" })
  );

  useEffect(() => {
    refetchProducts();
  }, [pageSize, pageNumber, refetchProducts]);

  // products
  useEffect(() => {
    if (isSuccessProducts) {
      setProducts(dataProducts?.payload);
    }
  }, [isSuccessProducts, isErrorProducts, dataProducts?.payload]);

  // categories
  useEffect(() => {
    if (isSuccessCt) {
      setCategories(dataCt?.payload);
    }
  }, [isSuccessCt, isErrorCt, dataCt?.payload]);

  // sub-categories
  useEffect(() => {
    if (isSuccessSubCt) {
      setSubCategories(dataSubCt?.payload);
    }
  }, [isSuccessSubCt, isErrorSubCt, dataSubCt?.payload]);

  // carousel
  useEffect(() => {
    if (isSuccessCarousel) {
      setBannerCarousel(dataCarousel?.payload);
    }
  }, [isSuccessCarousel, isErrorCarousel, dataCarousel?.payload]);

  // split-carousel
  useEffect(() => {
    if (isSuccessSplitCarousel) {
      setSplitCarousel(dataSplitCarousel?.payload);
    }
  }, [
    isSuccessSplitCarousel,
    isErrorSplitCarousel,
    dataSplitCarousel?.payload,
  ]);

  function splitArray(array: CarouselBanners[]) {
    const midpoint = Math.floor(array.length / 2);
    const firstPart = array.slice(0, midpoint);
    const secondPart = array.slice(midpoint);
    return [firstPart, secondPart];
  }

  const [firstBannerPart, secondBannerPart] = splitArray(bannerCarousel);

  const handleChangePage = (newPage: number) => {
    setPageNumber(newPage);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return {
    isLoadingCt,
    categories,
    isLoadingCarousel,
    autoplayBannerAds,
    firstBannerPart,
    autoplayBannerAds2,
    secondBannerPart,
    isLoadingSplitCarousel,
    splitCarousel,
    autoplaySplitAds,
    isLoadingSubCt,
    subCategories,
    products,
    isLoadingProducts,
    dataProducts,
    handleChangePage,
  };
};
