export default async ({ app, Vue }) => {
  alert('over here')
  app.$oneSignal = Vue.prototype.$oneSignal = {
    setup () {
      if (!process.env.ONESIGNAL_APP_ID) {
        return
      }
      window.OneSignal = window.OneSignal || []
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: process.env.ONESIGNAL_APP_ID,
          requiresUserPrivacyConsent: true,
          autoResubscribe: true,
          notifyButton: {
            enable: true
          },
          welcomeNotification: {
            disable: false
          }
        })
      })
    },
    optIn (externalUserId) {
      if (!process.env.ONESIGNAL_APP_ID) {
        return
      }
      window.OneSignal.provideUserConsent(true)
      window.OneSignal.showNativePrompt()
      if (externalUserId) {
        window.OneSignal.setExternalUserId(externalUserId)
      }
    },
    optOut () {
      if (!process.env.ONESIGNAL_APP_ID) {
        return
      }
      window.OneSignal.removeExternalUserId()
    }
  }
}
