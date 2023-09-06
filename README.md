# Firebase RPG Chat App

## Commands
* `firebase emulators:start`
* `./scripts/kill-emulators.sh && firebase emulators:start`
* `firebase deploy`
* `firebase deploy --only functions`
* `firebase deploy --only hosting`
* 

## Links
https://firebase.google.com/docs/hosting/multisites





## Issues

### Error: Unable to detect the web framework in use, check firebase-debug.log for more info.
on `firebase deploy --only hosting --debug`

#### Fix 
`nvm use 18`
`npm i -g firebase-tools`