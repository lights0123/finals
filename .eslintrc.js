module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'typescript-eslint-parser',
		sourceType: 'module',
	},
	extends: ['plugin:vue/recommended', 'airbnb-base'],
	// required to lint *.vue files
	plugins: ['vue'],
	// add your custom rules here
	rules: {
		'global-require': 0,
		'import/no-unresolved': 0,
		'no-param-reassign': 0,
		'no-shadow': 0,
		'import/extensions': 0,
		'import/newline-after-import': 0,
		'no-multi-assign': 0,
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/html-indent': ['error', 'tab', {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		'vue/component-name-in-template-casing': ['error', 'kebab-case'],
		'max-len': ['error', 140],
		'no-plusplus': 0
	}
};
