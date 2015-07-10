module.exports = {
    entry: './src/entry.js',
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
                loaders: ['jsx-loader?harmony']
            }
        ]
    }
};