﻿const path = require("path");
var glob = require("glob");

module.exports = {
    entry: toObject(glob.sync("./src/views/**/*.js")),
    output: {
        path: path.resolve(__dirname, "./dist/views"),
        filename: "[name].js"
    },
    devServer: {

        devMiddleware: {
            writeToDisk: true
        },

        compress: true,
    },
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: /node_modules/ //excludes node_modules folder from being transpiled by babel. We do this because it's a waste of resources to do so.
            },

            {
                test: /\.(png|jp(e*)g|svg|gif|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[folder]/[name].[ext]"
                        },
                    },
                ],
            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

        ],
    },

};

function toObject(paths) {
    var ret = {};
    console.log(paths);

    paths.forEach(function (path) {
        // you can define entry names mapped to [name] here
        ret[path.replace("./src/views/", "").replace(".js", "")] = path;
    });
    console.log(ret);

    return ret;
}