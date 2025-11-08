import z from 'zod'

//* zod custom errors
const ZOD_CODES = {
	INVALID_TYPE: 'invalid_type',
	TOO_BIG: 'too_big',
	TOO_SMALL: 'too_small',
	INVALID_FORMAT: 'invalid_format',
	NOT_MULTIPLE: 'not_multiple_of',
	UNRECOGNIZABLE_KEYS: 'unrecognized_keys',
	INVALID_UNION: 'invalid_union',
	INVALID_KEY: 'invalid_key',
	INVALID_ELEMENT: 'invalid_element',
	INVALID_VAL: 'invalid_value'
} as const

export const CREATE_ZOD_CONFIG = () => {
	z.config({
		customError: (iss) => {
			switch (iss.code) {
				case ZOD_CODES.INVALID_TYPE:
					return `Invalid type, expected ${iss.expected}.`
				case ZOD_CODES.TOO_BIG:
					return `Maximum length permitted ${iss.maximum}.`
				case ZOD_CODES.TOO_SMALL:
					return `Minimum required length is ${iss.minimum}.`
				case ZOD_CODES.INVALID_FORMAT:
					return `Invalid format, expected a valid ${iss.validation}.`
				case ZOD_CODES.NOT_MULTIPLE:
					return `Value must be a multiple of ${iss.multipleOf}.`
				case ZOD_CODES.UNRECOGNIZABLE_KEYS:
					return `The following keys are not recognized: ${iss.keys.join(', ')}.`
				case ZOD_CODES.INVALID_UNION:
					return `Value does not match any of the permitted types.`
				case ZOD_CODES.INVALID_KEY:
					return `Invalid key or property found.`
				case ZOD_CODES.INVALID_ELEMENT:
					return `Invalid element found in list.`
				case ZOD_CODES.INVALID_VAL:
					return `Value is not valid.`
			}
			return iss.message
		}
	})
}
