export default async ({ app, Vue }) => {
  app.$oneSignal = Vue.prototype.$oneSignal = {
    get instance () {
      return window.plugins && window.plugins.OneSignal
    },
    setup (appId, {initCallback} = {}) {
      if (!appId) {
        throw new Error('quasar-one-signal: app id is required')
      }

      document.addEventListener('deviceready', function () {
        window.plugins.OneSignal.startInit(appId)

        if (initCallback) {
          initCallback(window.plugins.OneSignal)
        }
        window.plugins.OneSignal.endInit()
      }, false)
    },
    optIn (externalUserId) {
      if (externalUserId) {
        window.plugins.OneSignal.setExternalUserId(externalUserId);
      }
    },
    optOut () {
      window.plugins.OneSignal.removeExternalUserId()
    }
  }
}
