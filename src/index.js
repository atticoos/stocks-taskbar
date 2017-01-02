require('babel-core/register')({
  presets: ['es2015'],
  plugins: [
    'syntax-object-rest-spread',
    'transform-object-rest-spread'
  ]
});
require('babel-polyfill');
require('./app');
