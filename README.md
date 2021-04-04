# WIP

## Peer Dependencies

- firebase@^8.0.0

## Installation

```
$ npm i capacitor-firebase-github-auth
$ npm cap sync
```

## iOS

https://firebase.google.com/docs/ios/setup

1. Register your app with Firebase
2. Add `GoogleService-Info.plist` into your project (`ios/App/App` from Xcode)
3. [Add a URL scheme to your project](https://developers.google.com/identity/sign-in/ios/start-integrating#add_a_url_scheme_to_your_project)
4. Add Firebase pod in `ios/App/Podfile`:

```
target 'App' do
  capacitor_pods

  pod 'Firebase/Core'
  pod 'Firebase/Auth'
  # Add your Pods here
end
```

## Android

https://firebase.google.com/docs/android/setup

1. Register your app with Firebase
2. Add SHA fingerprints (`Gradle task: android > Tasks > android > signingReport`)
3. Add `google-services.json` into your project (`android/app`)
4. Add google-services plugin to `android/build.gradle` / Firebase SDK to `android/app/build.gradle`
