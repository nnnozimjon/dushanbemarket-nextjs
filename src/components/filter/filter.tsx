import React from 'react'
import { MultiRadioSelect }  from '../multi-radio-select/multi-radio-select'
import { Box, Flex, InputBase } from '@mantine/core'
import { Accordion }  from '../accordion/accordion'

export function Filter (){
    const sampleData = [
        {name: 'Iphone 11', value: 'ip11'}, {name: 'Iphone 12', value: '12'},
        {name: 'Iphone 11', value: 'ip11'}, {name: 'Iphone 12', value: '12'},
        {name: 'Iphone 11', value: 'ip11'}, {name: 'Iphone 12', value: '12'}
    ]
    
  return (
    <div className='w-full'>
        <h3 className='py-3'>Фильтр</h3>
        <hr className='border-[rgba(0,0,0,0.1)]' />
        <Accordion title='Цена'>
          <Flex gap={'md'}>
            <InputBase placeholder='от'/>
            <InputBase placeholder='до' />
          </Flex>
        </Accordion>
        <Accordion title='Бренд'>
            <MultiRadioSelect  data={sampleData}/>
        </Accordion>
         <Accordion title='Модель'>
            <MultiRadioSelect  data={[{name: 'Iphone 11', value: 'ip11'}, {name: 'Iphone 12', value: '12'}]}/>
        </Accordion>
    </div>
  )
}
