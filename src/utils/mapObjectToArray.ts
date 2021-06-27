function mapObjectToArray<ValueType>(data: { [p: string]: ValueType }): ValueType[] {
  return Object.keys(data).map((key) => data[key])
}

export default mapObjectToArray
