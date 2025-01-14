# deep-proxy-monitor
> A simple library to monitoring the access to all the properties including nested properties in arrays and objects using the Proxy ES6 implementation.

<br/>
You can monitoring all the properties inside an object by reading the values of the monitor object generated by the library.

This is util for detect unused properties of an input object data to improve performance issues on large projects with a bunch of data.

Is recommended use only for development stages until the library could be ready for production scenarios and test performance cases.


<br/>

## Installation

```sh
npm install --save-dev deep-proxy-monitor
```

<br/>

## Usage example

You can use the `deepProxy` function to create a nested proxy to trap the access to any nested element inside the target object:

```
import { deepProxy } from 'deep-proxy-monitor'

const testObj = {
  foo: 'foo',
  bar: [{
    baz: 'baz',
    zoo: {
      cat: 'cat'
    }
  }]
}

const handler = {
  get: function (target, prop) {
    console.log(`Accessing to ${prop}`)
    return target[prop]
  }
}

const proxy = deepProxy(testObj, handler)

console.log(proxy.foo)
console.log(proxy.bar[0].zoo.cat)

// Outputs:

Accessing to foo
foo
Accessing to bar
Accessing to zoo
Accessing to cat
cat
```

Another important and useful use case is to monitoring the access to all elements of an object by watching the monitor object given by then `proxyMonitor` function:

```
import { proxyMonitor } from 'deep-proxy-monitor'

const testObj = {
  foo: 'foo',
  bar: [{
    baz: 'baz',
    zoo: {
      cat: 'cat'
    }
  }]
}

const [proxy, monitor] = proxyMonitor(testObj)

console.log(proxy.foo)
console.log(proxy.bar[0].zoo.cat)
console.log(JSON.stringify(monitor))

// Outputs:

foo
cat
{"foo":true,"bar":[{"baz":false,"zoo":{"cat":true}}]}
```

The default strategy for the `proxyMonitor` function is to assign `true` or `false` when an element is accessed or not.

You can customize the strategy function giving a second argument to the `proxyMonitor` function like:

```
import { proxyMonitor } from 'deep-proxy-monitor'
const testObj = {
  foo: 'foo',
  bar: [{
    baz: 'baz',
    zoo: {
      cat: 'cat'
    }
  }]
}

const monitorStrategy = {
  defaultValue: 0,
  strategy: (objToMonitor, prop) => {
    // count the number of element access
    if (typeof objToMonitor[prop] === 'number') {
      ++objToMonitor[prop]
    }
  }
}

const [proxy, monitor] = proxyMonitor(testObj, monitorStrategy)

console.log(proxy.foo)
console.log(proxy.bar[0].zoo.cat)
console.log(JSON.stringify(monitor))

// Outputs:

foo
cat
{"foo":1,"bar":[{"baz":0,"zoo":{"cat":1}}]}
```

_For more examples and usage, please refer to the tests cases in `test` folder._


<br/>

## Author

Stevens Pineda – [@Scol_Dev](https://twitter.com/Scol_Dev) – yo@stevenscol.co

Distributed under the MIT license. See ``LICENSE`` for more information.

<br/>

## Contributing

1. Fork it (https://github.com/ScolDev/deep-proxy-monitor/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request