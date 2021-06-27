import normalizeProduct from '@/utils/normalizeProduct'
import IProduct from '@/types/IProduct'

async function fetchProducts(): Promise<IProduct[]> {
  const res = await fetch(
    `https://my-json-server.typicode.com/erbcreedok/nakukop-test-data/products`
  )
  const goods = (await res.json())?.Value?.Goods || []
  return goods.map(normalizeProduct)
}

export default fetchProducts
