import IProduct from '@/types/IProduct'

interface IBasketItem {
  count: number
  product: IProduct
  error?: string
}

export default IBasketItem
