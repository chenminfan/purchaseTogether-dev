import { ProductsType } from '@typeTS/Products'

export type OrdersProdType = {
  product?: ProductsType,
  qty: number,
  final_total: number,
  total: number,
  product_id: string,
}
export type OrdersType = {
  create_at: number,
  id: string,
  is_paid: boolean,
  total: number,
  message: string,
  products: OrdersProdType,
  user: {
    address: string,
    email: string,
    name: string,
    tel: string,
  },
  num: number,
}