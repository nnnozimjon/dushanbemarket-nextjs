"use client"

import { setCity } from '@/store/slices';
import { RootState } from '@/store/store';
import { Grid, Modal, Text } from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    opened: boolean;
    onClose: () => void;
}

export const LocationModal: React.FC<Props> = ({ onClose, opened }) => {
    const dispatch = useDispatch()
    const userLocation = useSelector((state: RootState) => state?.location?.city)

    const changeLocation = (city: string) => {
        dispatch(setCity(city))
    }

    const cities = [
        'Душанбе',
        'Худжанд',
        'Вахдат',
        'Турсунзаде',
        'Гиссар',
        'Бохтар',
        'Куляб',
        'Истаравшан',
        'Исфара',
        'Канибадам',
        'Пенджикент',
    ];

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Выберите ваш город"
            centered
        >
            <Grid>
                {cities?.map((city, key) => <Grid.Col span={6} key={key}>
                    <div onClick={() => changeLocation(city)} className={`cursor-pointer ${city == userLocation ? 'bg-green text-[#fff] font-bold' : 'bg-gray-light'} rounded-md text-center w-full h-full p-[10px]`}>
                        <Text className='select-none'>{city}</Text>
                    </div>
                </Grid.Col>)}
            </Grid>
        </Modal>
    );
};
