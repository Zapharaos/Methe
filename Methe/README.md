## How to set up and run this application

Install the Expo Go application and create an account : \
https://expo.dev/client

Install the Expo package : \
`npm install expo`

Login to your Expo account : \
`npm expo login`

Run the application : \
`npx run start`

Might encounter some issues related to your router, then run this command instead : \
`npx expo start --tunnel`

You can now scan the QR code using you mobile device or directly open the Expo Go app where your application should already be waiting for you.

## How to build and use the APK

To set up for the builds : \
`npm install -g eas-cli`

By now, you should already be connected to your account : \
`eas whoami`

If you are not connected yet, connect to your Expo account : \
`eas login`

Ready to go!

Build for android : \
`eas build -p android --profile overview`

Run the latest build : \
`eas build:run -p android --latest`