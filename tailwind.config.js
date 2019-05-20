module.exports = {
	theme: {
		extend: {},
		inset: {
			'0': 0,
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'1/2': '50%',
			full: '100%',
		},
		opacity: {
			'0': '0',
			'25': '.25',
			'50': '.5',
			'75': '.75',
			'10': '.1',
			'20': '.2',
			'30': '.3',
			'40': '.4',
			'60': '.6',
			'70': '.7',
			'80': '.8',
			'90': '.9',
			'100': '1',
		},
	},
	variants: {
		display: ['group-hover'],
		opacity: ['responsive', 'hover', 'focus'],
	},
	plugins: [],
}
