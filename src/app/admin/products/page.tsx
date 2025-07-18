'use client';

import { Button } from '@/components/ui/button'
import React from 'react'
import {DataTable} from './data-table'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query';
import { getAllProduct } from '@/http/api';
import { Product } from '@/types';

const Productpage = () => {
    const {data: products} = useQuery<Product[]>({
      queryKey:["products"],
      queryFn:getAllProduct,
    });
  return (<>
    <div className='flex items-center justify-between'>
       <h3 className='text-2xl font-bold tracking-tight'>Product</h3>
       <Button size={'sm'} >Add Product</Button>
    </div>
    <DataTable columns={columns} data={products||[]}/>
    </>
  )
}

export default Productpage;
