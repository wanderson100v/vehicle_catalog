import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  plugins: [
    react({
      removeDevtoolsInProd: true,
      injectReact: true,
    }),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, '/src')
    }],
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: /src/,
        exclude: /node_modules/,
      },
    ]
  }
});