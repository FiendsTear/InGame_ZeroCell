const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
      {
				test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
					'postcss-loader'
        ]
      }
    ]
	},
	entry: './src/index.js',
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 3000
	},
	output: {
		path: __dirname + '/build'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'zeroCell',
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin()
	]
};