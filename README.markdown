# JCCell

Simple one-app sign in, fill in, view as catalog and select to buy for simple buy selling activity.

## Version 1.1 - working version

2 roles in one app: Input catalogue as shop owner, Buy an on sale catalogue, in one app
Catalogue picking feature: register multiple catalogue and pick the catalogue to display by a simple switch
Automatically recognize provider symbol (imported from src/images)
Auto Sign Up feature if email and password is not registered
Auto Sign Up can be enabled or disabled by simple switch
Autosend SMS feature on Android using messenger apps
Register seller phone number
Robust state and data transfer and input method
Sorted view and duplicate data view handled
Handled keyboard view and hardware back button presses
Material Design customer form format
Splash screen to ensure data being fetched at boot up

## Build notes

built on React Native 0.50.0-rc.2
with dependencies as follows:

"firebase": "^4.3.0"
"lodash": "^4.17.4"
"react": "16.0.0-alpha.12"
"react-native-router-flux": "^3.41.0"
"react-native-sms-android": "^0.4.1"
"react-number-format": "^3.1.0"
"react-redux": "^5.0.6"
"redux": "^3.7.2"
"redux-thunk": "^2.2.0"

## Potential downside

Not too Android-ish
Red screen if apps goes to background
Unhandled UX (SMS not sent, startup with no internet connection, etc.)
Styling on various device (flexbox and unique devices related problem)
Animation glitch
Internet connection related problem
