function addScriptTag () {
  if (document.getElementById('onesignal')) {
    return
  }

  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js'
  scriptTag.id = 'onesignal'
  scriptTag.hid = 'onesignal'
  scriptTag.async = true
  document.head.appendChild(scriptTag)
}

export default async ({ app, Vue }) => {
  const onClient = typeof window !== 'undefined'

  app.$oneSignal = Vue.prototype.$oneSignal = {
    get instance () {
      return window && window.OneSignal
    },
    setup (appId, initConfig = {}) {
      if (!onClient) {
        return
      }
      if (!appId) {
        throw new Error('quasar-one-signal: app id is required')
      }
      addScriptTag()

      window.OneSignal = window.OneSignal || []
      window.OneSignal.push(function () {
        window.OneSignal.init(Object.assign(
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
          },
          initConfig
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
