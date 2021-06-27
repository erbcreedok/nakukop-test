import IProduct from '@/types/IProduct'
import IResProduct from '@/types/IResProduct'

const normalizeProduct = (resProduct: IResProduct): IProduct => {
  return {
    price: resProduct.C,
    groupId: resProduct.G,
    productId: resProduct.T,
    count: resProduct.P,
  }
}

export default normalizeProduct
