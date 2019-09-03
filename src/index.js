/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const path = require('path')

const extendQuasarConf = function (conf, mode) {
  if (mode === 'cordova') {
    conf.boot.unshift('~quasar-app-extension-onesignal/src/boot-cordova.js')
  } else {
    conf.boot.unshift('~quasar-app-extension-onesignal/src/boot-web.js')
  }
  console.log(` App Extension (onesignal):  'Adding onesignal boot reference to your quasar.conf.js'`)
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function swTransformer(mode, path) {
    const scripts = [
      'https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js'
    ]

    if (mode === 'pwa' && endsWith(path, 'OneSignalSDKWorker.js')) {
      scripts.unshift('/service-worker.js?' + Date.now())
    }
    return `importScripts(${scripts.map(i => `'${i}'`).join(', ')})\r\n`;
}

const extendWebpackForWeb = function (conf, mode) {
  const CopyPlugin = require('copy-webpack-plugin')

  console.log(` App Extension (onesignal): Configure webpack to copy service workers to root directory`)

  conf.plugins.push(new CopyPlugin([
    {
      from: path.join(__dirname, 'assets', 'root'),
      to: '.',
      transform: (content, path) => swTransformer(mode, path)
    }
  ]))
}

module.exports = function (api) {
  api.compatibleWith('@quasar/app', '^1.0.0')

  const modeName = api.ctx.modeName
  api.extendQuasarConf((conf) => extendQuasarConf(conf, modeName))

  if (['pwa', 'spa', 'ssr'].includes(modeName)) {
    api.extendWebpack((conf) => extendWebpackForWeb(conf, modeName))
  }
}
