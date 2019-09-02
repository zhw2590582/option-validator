import optionValidator from '../index';

test('Shallow object with scheme validator 1', () => {
    optionValidator(
        {
            typeNumber: 42,
            typeString: 'str',
            typeObject: {},
            typeArray: [1, 2, 3],
        },
        {
            typeNumber: {
                type: 'number',
                validator: (value, type, paths) => {
                    return value === 42;
                },
            },
            typeString: {
                type: 'string',
                validator: (value, type, paths) => {
                    return value.length === 3;
                },
            },
            typeObject: {
                type: 'object',
                validator: (value, type, paths) => {
                    return Object.keys(value).length === 0;
                },
            },
            typeArray: {
                type: 'array',
                validator: (value, type, paths) => {
                    return value.length === 3;
                },
            },
        },
    );
});

test('Shallow object with scheme validator 2', () => {
    optionValidator(
        {
            typeNumber: 42,
            typeString: 'str',
            typeObject: {},
            typeArray: [1, 2, 3],
        },
        {
            typeNumber: (value, type, paths) => {
                return value === 42;
            },
            typeString: (value, type, paths) => {
                return value.length === 3;
            },
            typeObject: (value, type, paths) => {
                return Object.keys(value).length === 0;
            },
            typeArray: (value, type, paths) => {
                return value.length === 3;
            },
        },
    );
});

test('Shallow object with scheme validator and option validator', () => {
    optionValidator(
        {
            validator: 42,
            __validator__: 'str',
        },
        {
            validator: {
                validator: (value, type, paths) => {
                    return value === 42;
                },
            },
            __validator__: {
                validator: (value, type, paths) => {
                    return value.length === 3;
                },
            },
        },
    );
});

test('Shallow object with scheme validator and option without validator', () => {
    optionValidator(
        {
            typeNumber: 42,
            typeString: 'str',
            typeObject: {},
            typeArray: [1, 2, 3],
        },
        {
            validator: (value, type, paths) => {
                return Object.keys(value).length === 4;
            },
        },
    );
});
