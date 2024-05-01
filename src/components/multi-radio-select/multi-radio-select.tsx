"use client"
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Flex } from '@mantine/core'

interface data {
    name: string | number,
    value: string | number
}

interface Props {
    data: data[]
}

export default function MultiRadioSelect({ data }: Props){
  const [showAll, setShowAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<data[]>([]);

  const visibleItems = showAll ? data : data.slice(0, 5);

  const handleCheckboxChange = (item: any) => {
    const index = selectedItems.indexOf(item);
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const updatedSelection = [...selectedItems];
      updatedSelection.splice(index, 1);
      setSelectedItems(updatedSelection);
    }
  };

  useEffect(() => {},[])

  return (
    <Flex direction={'column'} gap={'sm'}>
        {visibleItems?.map((item: data | any, index) => 
        <Flex gap={'md'} align={'center'}  key={index}>
            <Checkbox
            classNames={{ label: 'text-[18px]' }}
            label={item.name}
            checked={selectedItems.includes(item)}
            onChange={() => handleCheckboxChange(item)}
          />
        </Flex>)}

        {data.length > 5 && (
        <Button  variant='subtle' color='green' c={'green'} className='' onClick={() => setShowAll(!showAll)}>
            {!showAll ? 'Посмотреть все' : 'Свернуть'}
        </Button>
      )}
    </Flex>
  )
}
