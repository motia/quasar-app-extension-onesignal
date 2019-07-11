export default async ({ app, Vue }) => {
  const onClient = typeof window !== 'undefined'

  app.$oneSignal = Vue.prototype.$oneSignal = {
    get instance () {
      return window && window.OneSignal
    },
    setup (appId, initConfig) {
      if (!onClient) {
        return
      }
      if (!appId) {
        throw new Error('quasar-one-signal: app id is required')
      }

      window.OneSignal = window.OneSignal || []
      window.OneSignal.push(function () {
        window.OneSignal.init(Object.assign(
          initConfig || {},
          {
            appId,
            requiresUserPrivacyConsent: true,
            autoResubscribe: true,
            notifyButton: {
              enable: true
            },
            welcomeNotification: {
              disable: false
            }
          }
        ))
      })
    },
    optIn (externalUserId) {
      if (!onClient) {
        return
      }
      window.OneSignal.provideUserConsent(true)
      window.OneSignal.showNativePrompt()
      if (externalUserId) {
        window.OneSignal.setExternalUserId(externalUserId)
      }
    },
    optOut () {
      if (!onClient) {
        return
      }
      window.OneSignal.removeExternalUserId()
    }
  }
}
