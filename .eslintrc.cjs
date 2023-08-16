module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint-config-prettier',
		'eslint:recommended', // 使用推荐的 eslint
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended', // 使用插件支持 vue3
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js 文件规则 2.开启 rules 的 "prettier/prettier": "error" 3.eslint fix 的同时执行 prettier 格式化
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'moudule',
		parser: '@typescript-eslint/parser',
	},
	plugins: [],
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
	},
	rules: {
		'prettier/prettier': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['error', 'warn'] }] : 'off', //生产模式不允许使用 log
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //生产默认不允许使用 debugger
		'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '._', args: 'none' }], //变量声明未使用
		'@typescript-eslint/no-explicit-any': 'off', // 允许 ts 使用 any
		// '@typescript-eslint/no-var-requires': 'off', // 强制使用 import 且不允许使用 require 设置 off 关闭检查
		// 'vue/require-v-for-key': 'off', // 对保留元素检查 vue3 中 v-for 会自动追加 key 值，所以不用再强制添加 key 属性，所以不检查 key 的填写
		// 'vue/valid-v-for': 'off', // 对于非保留(自定义)元素检查 vue3 中 v-for 会自动追加 key 值，所以不用再强制添加 key 属性，所以不检查 key 的填写
		// // 添加组件命名忽略规则 vue 官方默认规则是多单词驼峰来进行组件命名
		// 'vue/multi-word-component-names': [
		// 'warn',
		// {
		// ignores: ['index'], //需要忽略的组件名
		// },
		// ],
	},
};
