import { describe, test, expect, vi } from 'vitest'
import { deepProxy } from '../deep-proxy'

describe('tests for deepProxy functionalities', () => {
  const objToClone = {
    foo: 'foo',
    bar: {
      baz: 'baz',
      zoo: 'zoo'
    }
  }
  test('should exist deepProxy function', () => {
    expect(deepProxy).toBeDefined()
  })

  test('should deep clone the object to proxy', () => {
    const clonned = deepProxy(objToClone)

    expect(clonned === objToClone).toBe(false)
    expect(objToClone.bar === clonned.bar).toBe(false)
    expect(objToClone).toStrictEqual(clonned)
  })

  test('should create a deep proxy clonned object', () => {
    const handler = {
      get: function (target, prop) {
        return target[prop]
      }
    }
    vi.spyOn(handler, 'get')

    const proxy = deepProxy(objToClone, handler)
    const { foo, bar } = proxy
    const { baz, zoo } = bar

    expect(handler.get).toBeCalledTimes(4)

    expect(foo).toStrictEqual(objToClone.foo)
    expect(bar).toStrictEqual(objToClone.bar)
    expect(baz).toStrictEqual(objToClone.bar.baz)
    expect(zoo).toStrictEqual(objToClone.bar.zoo)
  })
})
