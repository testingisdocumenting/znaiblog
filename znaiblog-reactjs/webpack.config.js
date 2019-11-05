const path = require('path');
module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'blog-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};