"use client"

import React from 'react'
import { Button, Flex, Text } from '@mantine/core'
import { Icon } from '../icon'

interface Props {
    qty: number
    increase?: () => void
    decrease?: () => void
}

export const Counter: React.FC<Props> = ({ qty = 0, increase, decrease }: Props) => {
    return (
        <Flex align={'center'} gap={'lg'} className=''>
            <Button className='' variant='transparent' onClick={decrease}>
                <Icon name='minus' />
            </Button>
            <Text className={''}>{qty}</Text>
            <Button className='' variant='transparent' onClick={increase}>
                <Icon name='plus2' />
            </Button>
        </Flex>
    )
}
