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
2. Add `GoogleService-Info.plist` to your `ios/App/App` directory from Xcode
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
