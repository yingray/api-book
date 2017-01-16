'use strict';
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'example/index.js'),
    output: {
        path: path.join(__dirname, 'example/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: ['babel-loader']
            }
        ]
    }
};