import IResNames from '@/types/IResNames'
import IGroupNames from '@/types/IGroupNames'
import IProductNames from '@/types/IProductNames'

export interface INormalizedNames {
  groupNames: IGroupNames
  productNames: IProductNames
}
function normalizeNames(names: IResNames): INormalizedNames {
  const groupNames: IGroupNames = {}
  const productNames: IProductNames = {}
  Object.keys(names).map((groupId) => {
    const group = names[groupId]
    const products = group.B
    const productIds = Object.keys(products)
    productIds.forEach((productId) => {
      const product = group.B[productId]
      productNames[productId] = { id: +productId, name: product.N, groupId: +groupId }
    })
    groupNames[groupId] = {
      id: +groupId,
      name: group.G,
      products: productIds.map((id) => +id),
    }
  })
  return { groupNames, productNames }
}

export default normalizeNames
