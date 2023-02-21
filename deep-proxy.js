const defaultHandler = {
  get: function (target, prop) {
    return target[prop]
  }
}

const defaultMonitorStrategy = (objToMonitor, prop) => {
  if (!objToMonitor[prop]) { objToMonitor[prop] = true }
}

const cloneWithProxy = ({ objToProxy, handler, withMonitor = false, monitorStrategy }) => {
  const newObj = {}
  const monitorObj = {}
  const keys = Object.keys(objToProxy)
  const baseHandler = !withMonitor ? handler : buildHandlerWithMonitor(monitorObj)

  for (const key of keys) {
    if (typeof objToProxy[key] !== 'object') {
      if (withMonitor) {
        monitorObj[key] = false
      }

      newObj[key] = objToProxy[key]
      continue
    }

    if (objToProxy[key] instanceof Array) {
      const parent = objToProxy[key]

      for (let index = 0; index < parent.length; index++) {
        const child = parent[index]

        const [proxy, monitor] = cloneWithProxy({
          objToProxy: child,
          handler,
          withMonitor,
          monitorStrategy
        })

        if (!newObj[key]) newObj[key] = []
        if (!monitorObj[key]) monitorObj[key] = []

        newObj[key].push(proxy)
        monitorObj[key].push(monitor)
      }

      continue
    }

    const [proxy, monitor] = cloneWithProxy({
      objToProxy: objToProxy[key],
      handler,
      withMonitor,
      monitorStrategy
    })

    newObj[key] = proxy
    monitorObj[key] = monitor
  }

  return [new Proxy(newObj, baseHandler), monitorObj]
}

const buildHandlerWithMonitor = (objToMonitor = {}, strategy = defaultMonitorStrategy) => {
  return {
    get: function (target, prop) {
      strategy(objToMonitor, prop)
      return target[prop]
    }
  }
}

export const deepProxy = (objToProxy, handler = defaultHandler) => {
  return cloneWithProxy({ objToProxy, handler })[0]
}

export const proxyAndMonitor = (objToProxy, strategy = defaultMonitorStrategy) => {
  return cloneWithProxy({
    objToProxy,
    withMonitor: true,
    handler: defaultHandler,
    monitorStrategy: strategy
  })
}
