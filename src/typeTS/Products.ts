export type ProductsType = {
  [x: string]: any
  id: string,
  title: string,
  category: string,
  content: string,
  origin_price: number,
  price: number,
  num?: number,
  unit: string,
  description: string,
  is_enabled: number,
  imageUrl: string,
  imagesUrl: string[]
}