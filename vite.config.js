import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [

		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		// 配置路径别名
		alias: {
			'@': '/src',
		},
	},
	build: {
		publicPath: "./", // 公共路径(必须有的)
		outputDir: "dist", // 输出文件目录
		assetsDir: "static", //静态资源文件名称
		lintOnSave: false,
		productionSourceMap: false, //去除打包后js的map文件
		devServer: {
			open: true,
            port: 8001,
			proxy: null,
			// proxy: {
			//             '/api': {
			//                 target: "http://localhost:8888",//设置你调用的接口域名和端口号 别忘了加http
			//                 changeOrigin: true,
			//                 pathRewrite: {
			//                     '^/api': ''
			//                     //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
			//                     //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
			//                 }
			//             }
			//         }

		},
        // configureWebpack: (config) => {
        // 	// 判断为生产模式下，因为开发模式我们是想保存console的
        // 	if (process.env.NODE_ENV === "production") {
        // 		config.optimization.minimizer.map((arg) => {
        // 			const option = arg.options.terserOptions.compress;
        // 			option.drop_console = true; // 打开开关
        // 			return arg;
        // 		});
        // 	}
        //
        //
        // },
	},


});

