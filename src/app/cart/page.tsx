"use client"
import React, { useState } from 'react'
import { Button, Container, Flex, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { Counter, Icon } from '@/components'
import { addToCart, removeFromCart, removeProductById } from '@/store/slices'
import { RootState } from '@/store/store'



export default function CartPage() {
    const dispatch = useDispatch()
    const cart = useSelector((state: RootState) => state?.cart)

    const increaseProductQty = (product: any) => {
        dispatch(addToCart(product))
    }

    const decreaseProductQty = (product: any) => {
        dispatch(removeFromCart(product?.id))
    }

    const removeProductFully = (product: any) => {
        dispatch(removeProductById(product?.id))
    }

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

    const sortedProducts = groupProductsByCreatedBy(cart?.products)


    return (
        <Container size={'xl'}>
            <div className='my-4 md:py-10 flex lg:flex-row flex-col gap-5'>
                <div className='w-full'>
                    <Flex gap={'md'} align={'center'}>
                        <h1 className='text-[18px] md:text-[2em]'>Корзина</h1>
                        <Text className='p-0 m-0'>
                            ({cart?.totalItems} товар)
                        </Text>
                    </Flex>
                    {cart?.products.length == 0 ? <Flex direction={'column'} gap={'lg'} className='w-full h-[600px]' align={'center'} justify={'center'}>
                        <Icon variant='outline' name='buy' className='h-[120px] w-[120px] md:h-[180px] md:w-[180px] text-[#01B766]' />
                        <Flex direction={'column'} align={'center'}>
                            <Text className='text-[#212121] font-bold text-[16px]'>
                                Корзина пуста
                            </Text>
                            <Text className='text-center'>
                                Воспользуйтесь поиском, чтобы найти всё, что нужно.
                            </Text>
                        </Flex>
                    </Flex>
                        :
                        <Flex direction={'column'} gap={'lg'} className='overflow-hidden'>
                            {sortedProducts?.map((store: any, index: number) =>
                                <Flex key={index} direction={'column'} gap={'lg'} className='overflow-hidden'>
                                    <div className='bg-[rgb(247,248,249)] w-full p-5 rounded-md'>
                                        <Flex justify={'space-between'} className='w-full'>
                                            <Text className='text-[#949aa0]'>Способ доставки</Text>
                                            <Text className='text-[#949aa0]'>Общая сумма</Text>
                                        </Flex>
                                        <Flex justify={'space-between'} className='w-full'>
                                            <Text >Доставка от {store?.storeName}</Text>
                                            <Text className='font-bold'>
                                                {Number(store?.products.reduce((total: any, product: any) => total + (product.price * product.quantity), 0)).toFixed(2)} c.
                                            </Text>
                                        </Flex>
                                    </div>
                                    {store?.products?.map((product: any, index: number) =>
                                        <Flex key={index} justify={'space-between'}>
                                            <Flex gap={'md'}>
                                                <img className='h-[100px] w-auto' src={product?.images?.split(',')[0]} />
                                                <div>
                                                    <Text className='font-bold text-[20px]'>{Number(product?.price).toFixed(2)} c.</Text>
                                                    <Text className='text-[18px]'>{product?.name}</Text>
                                                </div>
                                            </Flex>
                                            <Flex className='w-fit' align={'end'} gap={'lg'}>
                                                <Counter increase={() => increaseProductQty(product)} decrease={() => decreaseProductQty(product)} qty={product?.quantity} />
                                            </Flex>
                                        </Flex>
                                    )}
                                </Flex>
                            )}
                        </Flex>}
                </div>
                {cart?.products.length >= 1 && <div className='h-full lg:w-1/3 w-full pt-10'>
                    <div className=' bg-[rgb(247,248,249)] p-5 rounded-md'>
                        <Flex justify={'space-between'} align={'baseline'} className='w-full' gap={'lg'}>
                            <Text className='text-[#949aa0] w-fit text-[14px]'>Товары({cart?.totalItems})</Text>
                            <div className='border-gray-light border-b-[1px] border-0 border-dotted w-full' />
                            <Text className='text-[#949aa0] w-fit text-[14px]'>{Number(cart?.totalPrice + (sortedProducts?.length * 25)).toFixed(2)}c.</Text>
                        </Flex>
                        <Flex justify={'space-between'} align={'baseline'} className='w-full' gap={'lg'}>
                            <Text className='text-[#949aa0] w-fit text-[14px]'>Скидка</Text>
                            <div className='border-gray-light border-b-[1px] border-0 border-dotted w-full' />
                            <Text className='text-[#949aa0] w-fit text-[14px]'>{'0'}c.</Text>
                        </Flex>
                        <Flex justify={'space-between'} align={'baseline'} className='w-full' gap={'lg'}>
                            <Text className='text-[#949aa0] w-full text-[14px]'>Общая сумма доставки</Text>
                            <div className='border-gray-light border-b-[1px] border-0 border-dotted w-full' />
                            <Text className='text-[#949aa0] w-fit text-[14px]'>{sortedProducts?.length * 25}c.</Text>
                        </Flex>
                        <Flex justify={'space-between'} align={'baseline'} className='w-full' gap={'lg'}>
                            <Text className='text-[#000] font-bold text-[18px] w-fit'>Итого</Text>
                            <div className='border-gray-light border-b-[1px] border-0 border-dotted w-full' />
                            <Text className='text-[#000] font-bold text-[18px] w-fit'>{Number(cart?.totalPrice + (sortedProducts?.length * 25)).toFixed(2)}c.</Text>
                        </Flex>
                        <br />
                        <Button bg={'green'} className='w-full text-[18px] h-[50px]' onClick={() => window.location.replace('/order')}>Перейти к оформлению</Button>
                    </div>
                </div>}
            </div>
            <br/>
            <br/>
        </Container>
    )
}
