import optionValidator from '..';

const optionData = {
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
  typeFloat64Array: new Float64Array(),
  deepObject1: {
    typeUndefined: undefined,
    typeNull: null,
    typeBoolean: true,
    typeBoolean2: false,
    deepObject2: {
      typeUndefined: undefined,
      typeNull: null,
      typeBoolean: true,
      typeBoolean2: false,
      deepObject3: {
        typeUndefined: undefined,
        typeNull: null,
        typeBoolean: true,
        typeBoolean2: false
      }
    }
  },
  deepArray1: [
    [
      [
        [
          {
            typeUndefined: undefined,
            typeNull: null,
            typeBoolean: true,
            typeBoolean2: false
          }
        ]
      ]
    ]
  ]
};

test('11', () => {
  const state = optionValidator(optionData, {
    a: 'string',
    b: 'number',
    c: 'boolean',
    d: 'null'
  });
  expect(state).toBe(true);
});
