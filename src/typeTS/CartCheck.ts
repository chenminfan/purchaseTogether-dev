import { ProductsType } from '@typeTS/Products'

export type CartCheckProdType = {
  final_total: number,
  id: string,
  product: ProductsType,
  qty: number,
  total: number
}
export type CartCheckType = {
  create_at: number,
  id: string,
  is_paid: boolean,
  total: number,
  final_total: number,
  message: string,
  products: CartCheckProdType,
  user: {
    address: string,
    email: string,
    name: string,
    tel: string,
  },
  num: number,
}