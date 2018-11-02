# option-validator

> A simple option validator

## Install

```
$ npm install option-validator
```

## Usage

```js
import optionValidator from 'option-validator';
```

OR umd builds are also available

```html
<script src="path/to/option-validator.js"></script>
```

#### Support types

```js
const option = {
  typeUndefined: undefined,
  typeNull: null,
  typeBoolean: true,
  typeBoolean2: false,
  typeBuffer: new Buffer(''),
  typeNumber: 42,
  typeString: 'str',
  typeObject: {},
  typeObject2: Object.create(null),
  typeDate: new Date(),
  typeArray: [1, 2, 3],
  typeRegexp: /foo/,
  typeRegexp2: new RegExp('foo'),
  typeError: new Error('error'),
  typeFunction: function() {},
  typeGeneratorfunction: function*() {},
  typeSymbol: Symbol('str'),
  typeMap: new Map(),
  typeWeakMap: new WeakMap(),
  typeSet: new Set(),
  typeWeakSet: new WeakSet(),
  typeInt8Array: new Int8Array(),
  typeUint8Array: new Uint8Array(),
  typeUint8ClampedArray: new Uint8ClampedArray(),
  typeUint16Array: new Uint16Array(),
  typeInt32Array: new Int32Array(),
  typeUint32Array: new Uint32Array(),
  typeFloat32Array: new Float32Array(),
  typeFloat64Array: new Float64Array()
};

const scheme = {
  typeUndefined: 'undefined',
  typeNull: 'null',
  typeBoolean: 'boolean',
  typeBoolean2: 'boolean',
  typeBuffer: 'buffer',
  typeNumber: 'number',
  typeString: 'string',
  typeObject: 'object',
  typeObject2: 'object',
  typeDate: 'date',
  typeArray: 'array',
  typeRegexp: 'regexp',
  typeRegexp2: 'regexp',
  typeError: 'error',
  typeFunction: 'function',
  typeGeneratorfunction: 'generatorfunction',
  typeSymbol: 'symbol',
  typeMap: 'map',
  typeWeakMap: 'weakmap',
  typeSet: 'set',
  typeWeakSet: 'weakset',
  typeInt8Array: 'int8array',
  typeUint8Array: 'uint8array',
  typeUint8ClampedArray: 'uint8clampedarray',
  typeUint16Array: 'uint16array',
  typeInt32Array: 'int32array',
  typeUint32Array: 'uint32array',
  typeFloat32Array: 'float32array',
  typeFloat64Array: 'float64array'
};

optionValidator(option, scheme);
```

#### Multiple types

```js
optionValidator(
  {
    numberOrString: 42,
    stringOrArray: ['1', '2', '3']
  },
  {
    numberOrString: 'number|string',
    stringOrArray: 'string|array'
  }
);
```

#### Scheme type

```js
optionValidator(
  {
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  },
  {
    typeNumber: {
      type: 'number'
    },
    typeString: {
      type: 'string'
    },
    typeObject: {
      type: 'object'
    },
    typeArray: {
      type: 'array'
    }
  }
);
```

#### Scheme validator

```js
optionValidator(
  {
    typeNumber: 42,
    typeString: 'str',
    typeObject: {},
    typeArray: [1, 2, 3]
  },
  {
    typeNumber: {
      type: 'number',
      validator: (paths, value, type) => {
        return value === 42;
      }
    },
    typeString: {
      type: 'string',
      validator: (paths, value, type) => {
        return value.length === 3;
      }
    },
    typeObject: {
      type: 'object',
      validator: (paths, value, type) => {
        return Object.keys(value).length === 0;
      }
    },
    typeArray: {
      type: 'array',
      validator: (paths, value, type) => {
        return value.length === 3;
      }
    }
  }
);
```

#### Scheme required

```js
optionValidator(
  {
    typeNumber: 42
  },
  {
    typeNumber: {
      required: true
    }
  }
);
```

#### Scheme child

```js
optionValidator([1, 2, 3], {
  type: 'array',
  child: {
    type: 'number'
  }
});

optionValidator({
  typeObject: {
    typeNumber: 42,
    typeString: 'str',
    typeArray: [1, 2, 3]
  }
}, {
  type: 'object',
  child: {
    typeNumber: 'number',
    typeString: 'string',
    typeArray: 'array'
  }
});
```

## License

MIT © [Harvey Zack](https://www.zhw-island.com/)
