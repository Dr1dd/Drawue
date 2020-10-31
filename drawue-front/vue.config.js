const path = require('path');
module.exports ={
    publicPath: '/',
    outputDir: path.resolve(__dirname, '../drawue-back/public'),
    devServer:{
            proxy: {
                '/api': {
                    target: 'http://localhost:5000'
                },
            },
            allowedHosts: [
                'drawue.com'
            ]
    },


}