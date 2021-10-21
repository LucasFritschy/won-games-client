import { getStorageItem, setStorageItem } from '.'

describe('getStorageItem()', () => {
  beforeEach(() => {
    window.localStorage.clear
  })

  it('should return the item from localStorage', () => {
    window.localStorage.setItem(
      'WONGAMES_cartItems',
      JSON.stringify(['1', '2'])
    )

    expect(getStorageItem('cartItems')).toStrictEqual(['1', '2'])
  })
})

describe('setStorageItem()', () => {
  beforeEach(() => {
    window.localStorage.clear
  })

  it('should set the item in localStorage', () => {
    setStorageItem('cartItems', ['1', '2'])

    const data = window.localStorage.getItem('WONGAMES_cartItems')

    expect(data).toStrictEqual(JSON.stringify(['1', '2']))
  })
})
