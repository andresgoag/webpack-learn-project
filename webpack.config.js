const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    // Definir el punto de entrada
    entry: "./src/index.js",
    // Definir el punto de salida
    output: {
        // Utilizar el objeto path para siempre encontrar el path del proyecto
        // Es un estandar que se ponga en la carpeta dist
        path: path.resolve(__dirname, "dist"),
        // Archivo unificado de javascript
        filename: "[name].[contenthash].js",
    },
    resolve: {
        // Definir que tipo de archivos va a buscar webpack
        // Ej: para react anadir .jsx
        extensions: [".js"],
        // Crear alias para direcciones largas
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
        },
    },
    module: {
        rules: [
            // Configurar babel
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            // Configurar Css
            {
                test: /\.css|.styl$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader",
                ],
            },
            // Configura assets loader images
            {
                test: /\.png/,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext][query]", // Directorio de salida
                },
            },
            // Configurar fonts
            {
                test: /\.(woff|woff2)$/i, // Tipos de fuentes a incluir
                type: "asset/resource", // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                generator: {
                    filename: "assets/fonts/[hash][ext][query]", // Directorio de salida
                },
            },
        ],
    },
    plugins: [
        // Configurar html-webpack-plugin
        new HtmlWebpackPlugin({
            // activarlo
            inject: true,
            // template base
            template: "./public/index.html",
            // resultado
            filename: "./index.html",
        }),
        // Configurar mini-css-extract-plugin
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        // Nueva instancia de copy y configurar
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images",
        //         },
        //     ],
        // }),
        // Configuracion de dotenv
        new Dotenv(),
        // Configuracion clean webpack plugin
        new CleanWebpackPlugin(),
    ],
    // Optimizar y minimizar
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
};
