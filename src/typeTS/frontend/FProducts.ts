type FrontendProductsImageType = {
  value: string,
}

export type FrontendProductsType = {
  category: string,
  content: string,
  description: string,
  id: string,
  imageUrl: string,
  imagesUrl?: FrontendProductsImageType[],
  is_enabled: number,
  num?: number,
  origin_price: number,
  price: number,
  title: string,
  unit: string
}
