import fetchNames from '@/fetchers/fetchNames'
import fetchProducts from '@/fetchers/fetchProducts'
import IProduct from '@/types/IProduct'
import IGroupNames from '@/types/IGroupNames'
import IProductNames from '@/types/IProductNames'

export interface IFetchAllData {
  products: IProduct[]
  groupNames: IGroupNames
  productNames: IProductNames
}

async function fetchAllData(): Promise<IFetchAllData> {
  const { productNames, groupNames } = await fetchNames()
  const products = await fetchProducts()
  return { products, productNames, groupNames }
}

export default fetchAllData
