//instalar npm install --save-dev html-loader html-webpack-plugin // el primero copiara el index html a dist, y el segundo actualizara el nombre de instancia del archivo de javascript

//verificar que se hayan agregado automaticamente en el package.json 


const HtmlWebPackPlugin = require('html-webpack-plugin'); //require es una forma que tiene node para cargar estos archivos de otros paquetes. 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports={
    mode: 'development', 
    module:{
        rules:[//sirve para  decirles a webpack que hacer en ciertas ocaciones o con ciertos archivos
            {

                test: /\.css$/,
                exclude: /styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.html$/i, //a todos los archivos con extension html 
                loader: 'html-loader', //les aplicara el paquete html-loader que instalamos
                options: {
                    attributes: false,
                    minimize: false, //para especificar si se minimfica o no el archivo
                },
            }, 
            //maneejo de imagenes
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]

            }


        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', //le dice a webpack que archivo es el que quiero tomar
            filename: './index.html' //y esto hacia donde quiero colocarlo
        }),
        //
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder:false
        }),
        new copyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/'},

            ],
        })
        
    ]
}