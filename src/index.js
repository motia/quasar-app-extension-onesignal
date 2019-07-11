/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const path = require('path')

const extendQuasarConf = function (conf) {
  conf.boot.unshift('~quasar-app-extension-onesignal/src/boot.js')
  console.log(` App Extension (onesignal):  'Adding onesignal boot reference to your quasar.conf.js'`)
}

const extendWebpack = function (conf) {
  const CopyPlugin = require('copy-webpack-plugin')

  console.log(` App Extension (onesignal): Configure webpack to copy service workers to root directory`)

  conf.plugins.push(new CopyPlugin([
    { from: path.join(__dirname, 'assets', 'root'), to: '.' }
  ]))
}

module.exports = function (api) {
  api.compatibleWith('@quasar/app', '^1.0.0')

  api.extendQuasarConf(extendQuasarConf)
  api.extendWebpack(extendWebpack)
}
