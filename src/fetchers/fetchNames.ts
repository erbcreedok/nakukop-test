import normalizeNames, { INormalizedNames } from '@/utils/normalizeNames'

async function fetchNames(): Promise<INormalizedNames> {
  const res = await fetch(`https://my-json-server.typicode.com/erbcreedok/nakukop-test-data/names`)
  const names = await res.json()
  return normalizeNames(names)
}

export default fetchNames
