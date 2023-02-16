export const deepProxy = (objToProxy) => {
  const newObj = {}
  const keys = Object.keys(objToProxy)

  for (const key of keys) {
    if (typeof objToProxy[key] !== 'object') {
      newObj[key] = objToProxy[key]
    } else {
      newObj[key] = deepProxy(objToProxy[key])
    }
  }

  return newObj
}
