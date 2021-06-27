import IBasketItem from '@/types/IBasketItem'
import isBrowser from '@/utils/isBrowser'

const BasketStorage = {
  loadBasket(): IBasketItem[] {
    let basketJSON = '[]'
    if (isBrowser()) {
      basketJSON = localStorage.getItem('basket') || '[]'
    }
    try {
      return JSON.parse(basketJSON) as IBasketItem[]
    } catch (e) {
      return [] as IBasketItem[]
    }
  },
  saveBasket(basket: IBasketItem[]): void {
    if (isBrowser()) {
      localStorage.setItem('basket', JSON.stringify(basket))
    }
  },
}

export default BasketStorage
