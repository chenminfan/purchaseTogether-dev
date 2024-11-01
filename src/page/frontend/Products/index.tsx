import React, { useEffect, useState } from 'react'
import Prods from '@components/frontend/Prods'
import { getProductsApi } from '@api/Apis/product/getProducts'
import { FrontendProductsType } from '@typeTS/frontend/FProducts'
import './products.scss'

export default function Products() {
  const [prods, setProds] = useState<FrontendProductsType[]>([])
  const getProds = async () => {
    const prodRes = await getProductsApi();
    setProds(prodRes.data.products)
    console.log(prodRes)
  }
  useEffect(() => {
    getProds()
  }, [])
  return (
    <div className='container-fluid py-2'>
      <div className="row">
        <div className="col">
          <div className="prods_box">
            {prods.map((item) => {
              return (
                <Prods key={item.id} prod={item} />
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
