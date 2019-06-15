const { EnvironmentPlugin } = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: 'inline-cheap-module-source-map',
  entry: './src/index.ts',
  output: {
    filename: 'index.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'production',
    }),
  ],
};
