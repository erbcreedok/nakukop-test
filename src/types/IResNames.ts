interface IResNames {
  [groupId: string]: {
    G: string //group name
    B: {
      // products
      [productId: string]: {
        N: string // product name
      }
    }
  }
}

export default IResNames
