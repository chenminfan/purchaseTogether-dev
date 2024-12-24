import { ProductsType } from '@typeTS/Products'

export type OrdersProdType = {
  product?: {
    [propsName: string]: ProductsType
  },
  final_total: number,
  total: number,
  id: string,
  product_id: string,
  qty: number,
}
export type OrdersType = {
  create_at: number,
  id: string,
  is_paid: boolean,
  total: number,
  message: string,
  products: {
    OrdersProdType
  }
  user: {
    address: string,
    email: string,
    name: string,
    tel: string,
  },
  num: number,
}