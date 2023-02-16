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
})
