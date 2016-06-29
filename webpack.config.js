module.exports = {
    entry: [
        'babel-polyfill',
        './src/entry.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
}
