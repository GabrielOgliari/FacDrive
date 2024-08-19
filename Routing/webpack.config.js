const path = require('path');

module.exports = {
    entry: './src/JS/Main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/src/JS', 'dist'),
    },
    mode: 'production',
};
