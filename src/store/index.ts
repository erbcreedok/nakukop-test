import { createContext } from 'react'
import { createStoreon, StoreonStore } from 'storeon'
import { customContext } from 'storeon/react'
import IGroupNames from '@/types/IGroupNames'
import IProductNames from '@/types/IProductNames'
import IProduct from '@/types/IProduct'
import IBasketItem from '@/types/IBasketItem'
import { INormalizedNames } from '@/utils/normalizeNames'
import { storeonDevtools } from 'storeon/devtools'
import { IFetchAllData } from '@/fetchers/fetchAllData'
import BasketStorage from '@/utils/BasketStorage'
import getRandomDollarRate from '@/utils/getRandomDollarRate'
import isBrowser from '@/utils/isBrowser'

export interface State {
  groupNames: IGroupNames
  productNames: IProductNames
  products: IProduct[]
  basket: IBasketItem[]
  dollarRate: number
  oldDollarRate: number | null
}
export interface Events {
  set: State | IFetchAllData
  'names/set': INormalizedNames
  'products/set': IProduct[]
  'basket/add': IProduct
  'basket/remove': IProduct['productId']
  'basket/setCount': { productId: IProduct['productId']; count: number }
  'dollarRate/set': number
}
export const initState: State = {
  groupNames: {},
  productNames: {},
  products: [],
  basket: BasketStorage.loadBasket(),
  dollarRate: getRandomDollarRate(),
  oldDollarRate: null,
}

export const productsModule = (store: StoreonStore<State, Events>): void => {
  store.on('@init', () => ({ ...initState }))
  store.on('set', (state, payload) => ({ ...state, ...payload }))
  store.on('names/set', (state, payload) => {
    return {
      ...state,
      groupNames: { ...state.groupNames, ...payload.groupNames },
      productNames: { ...state.productNames, ...payload.productNames },
    }
  })
  store.on('products/set', (state, payload) => ({ ...state, products: payload }))
  store.on('basket/add', (state, product) => {
    const basket = [...state.basket]
    const index = basket.findIndex((item) => item.product.productId === product.productId)
    if (index === -1) {
      basket.push({ count: 1, product })
      BasketStorage.saveBasket(basket)
      return {
        ...state,
        basket,
      }
    }
    store.dispatch('basket/setCount', {
      count: basket[index].count + 1,
      productId: product.productId,
    })
  })
  store.on('basket/remove', (state, productId) => {
    const basket = [...state.basket]
    const index = basket.findIndex((item) => item.product.productId === productId)
    if (index === -1) {
      throw new Error('Данного товара нет в корзине')
    } else {
      basket.splice(index, 1)
    }
    BasketStorage.saveBasket(basket)
    return {
      ...state,
      basket,
    }
  })
  store.on('basket/setCount', (state, { count, productId }) => {
    const basket = [...state.basket]
    const index = basket.findIndex((item) => item.product.productId === productId)
    if (index === -1) {
      throw new Error('Данного товара нет в корзине')
    } else {
      delete basket[index].error
      if (basket[index].product.count < count) {
        basket[index].error = 'В наличии нет данного количества товаров'
      }
      if (count < 1) {
        basket[index].error = 'Нельзя указать количество товаров меньше чем 1'
      }
      basket[index].count = count
    }
    BasketStorage.saveBasket(basket)
    return {
      ...state,
      basket,
    }
  })
  store.on('dollarRate/set', (state, dollarRate) => {
    return {
      ...state,
      dollarRate,
      oldDollarRate: state.dollarRate,
    }
  })
}

export const store = createStoreon<State, Events>([
  productsModule,
  isBrowser() && process.env.NODE_ENV !== 'production' && storeonDevtools,
])

export const AppContext = createContext(store)

export const useStoreon = customContext(AppContext)
