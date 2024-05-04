import React from 'react'
import { Box, Flex, Image, Skeleton, Text } from '@mantine/core'
import { Icon } from '..'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist, removeFromWishlist, removeProductById } from '../../store/slices'
import { RootState } from '@/store/store'

interface Props {
    img: string;
    price: number;
    name: string
    id: number
    storeName: string
    created_by: number
}

export default function ProductCard({ img, name, price, id, created_by, storeName }: Props){
    const dispatch = useDispatch()
    const products: any[] = useSelector((state: RootState) => state?.wishlist?.products)

    const productImage = img ? img?.split(',') : []

    const cartProducts: any[] = useSelector((state: RootState) => state?.cart?.products)

    const isLiked = React.useMemo(() => {
        return products?.find((product) => product.id === id);
    }, [products, id]);

    const isInCart = React.useMemo(() => {
        return cartProducts?.find((product) => product.id === id);
    }, [cartProducts, id]);

    const handleAddToWishList = () => {
        dispatch(addToWishlist({ id, name, images: img, price, storeName, created_by }))
    }

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist({ id, name, images: img, price, storeName, created_by }))
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, images: img, price, created_by, storeName }))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeProductById(id))
    }

    const likeAndDislike = () => {
        if (isLiked) {
            return handleRemoveFromWishlist()
        }
        handleAddToWishList()
    }

    const addAndRemoveFromCart = () => {
        if (isInCart) {
            return handleRemoveFromCart()
        }

        return handleAddToCart()
    }


    return (
        <Flex direction={'column'} className={`flex-shrink-0`}>
            <Flex direction={'column'} className={'relative  bg-[#f8f8f8] rounded-[25px] p-5'}>
                {!img ? <Skeleton className="h-full" radius="xl" /> :
                <Image src={productImage[0]} className='object-cover w-full h-full' alt='' />}
                <Box className={'shadow-md cursor-pointer absolute top-[10px] right-[10px] p-[5px] rounded-full w-fit h-fit flex items-center justify-center bg-[#fff]'}>
                    {!!id && <Icon onClick={likeAndDislike} variant={isLiked ? 'primary' : 'outline'} name='heart' className={'text-[#01B763]'} />}
                </Box>
            </Flex>
            <Flex className='bg-[#f8f8f8] mt-2 p-2 rounded-[10px]' align={'center'}>
                <div className='w-full'>
                    {!name ? <Skeleton className="h-[15px] w-4/6 mt-4" radius="xl" /> :
                    <Link href={`/product/${id ? id : '2'}`} className={'text-[14px] md:text-[16px] w-fit font-bold text-[#212121] mb-0 font-[Urbanist] no-underline '}>
                        {name}
                    </Link>}
                    {price ? <Text className='mt-0 text-[14px] md:text-[16px] font-bold text-[#01B763] flex items-center'>
                        <Icon name='money' />
                        {Number(price).toFixed(2)}
                    </Text> :
                    <Skeleton className="h-[15px] w-4/12 mt-4" radius="xl" />}
                </div>
                <Box className={'shadow-md cursor-pointer p-[5px] rounded-full w-fit h-fit flex items-center justify-center bg-[#fff]'}>
                    {!!id && <Icon onClick={addAndRemoveFromCart} variant={isInCart ? 'primary' : 'outline'} name='buy' className={'text-[#01B763]'} />}
                </Box>
            </Flex>
        </Flex>
    )
}
