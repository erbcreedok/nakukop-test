import IProductName from '@/types/IProductName'

interface IGroupName {
  id: number
  name: string
  products: IProductName['id'][]
}

export default IGroupName
