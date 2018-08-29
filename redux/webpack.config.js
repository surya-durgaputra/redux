var folder = __dirname

module.exports = {
    entry: "./src/index.js",
    output: {
        path: folder + "/dist/assets",
        filename:"bundle.js",
        publicPath: "assets"
    },
    devServer:{
        inline: true,
        contentBase:folder + "/dist",
        port: 3000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader']

            }
        ]
    }
}