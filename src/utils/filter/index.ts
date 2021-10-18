import { ItemProps } from 'components/ExploreSidebar'
import { ParsedUrlQueryInput } from 'querystring'

type ParseArgs = {
  queryString: ParsedUrlQueryInput
  filterItems: Pick<ItemProps, 'name' | 'type'>[]
}

export const parseQueryStringToWhere = ({
  filterItems,
  queryString
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString)
    .filter((key) => key !== 'sort')
    .forEach((key) => {
      const item = filterItems.find((item) => item.name === key)
      const isCheckbox = item?.type === 'checkbox'

      obj[key] = isCheckbox
        ? { name_contains: queryString[key] }
        : queryString[key]
    })

  return obj
}

export const parseQueryStringToFilter = ({
  filterItems,
  queryString
}: ParseArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}

  Object.keys(queryString).forEach((key) => {
    const item = filterItems.find((item) => item.name === key)
    const isCheckbox = item?.type === 'checkbox'
    const isArray = Array.isArray(queryString[key])

    obj[key] = !isArray && isCheckbox ? [queryString[key]] : queryString[key]
  })

  return obj
}
