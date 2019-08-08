## Quasar App Extension OneSignal

Adds [onesignal](https://onesignal.com) push notifications to  [quasar framework](http://github.com/quasarframework/quasar) apps.

> currently only web and pwa are supported

## Setup
```
yarn add quasar-app-extension-onesignal
quasar ext invoke onesignal
```

### PWA mode
For pwa mode, edit the generated `src-pwa/register-service-worker.js` and change
`register(process.env.SERVICE_WORKER_FILE, {` to `register('/OneSignalSDKWorker.js', {`

## API
Extends vue components and the app with $oneSignal:

```
    $vm.$oneSignal === {
        get Instance (): Object|Array; // returns window.OneSignal
        setup (appId: string, initConfig?: Object) ;
        optIn (extenalUserId?: string);
        optout ();
    }
```

## Usage
```
  // setup one signal
  app.$oneSignal.setup(process.env.ONESIGNAL_APP_ID)

  store.watch(
    () => store.state.auth.user,
    function (user) {
      if (user) {
        // optin using an optional external_user_id
        app.$oneSignal.optIn(user.push_id)
      } else {
        // optout
        app.$oneSignal.optOut()
      }
    }
  )
```
