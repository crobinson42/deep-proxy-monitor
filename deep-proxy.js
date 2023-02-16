const defaultHandler = {
  get: function (target, prop) {
    return target[prop]
  }
}

export const deepProxy = (objToProxy, handler = defaultHandler) => {
  const newObj = {}
  const keys = Object.keys(objToProxy)

  for (const key of keys) {
    if (typeof objToProxy[key] !== 'object') {
      newObj[key] = objToProxy[key]
    } else {
      newObj[key] = deepProxy(objToProxy[key], handler)
    }
  }

  return new Proxy(newObj, handler)
}
