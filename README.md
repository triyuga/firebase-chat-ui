# Firebase Chat UI demo

This demo application is built using [Firebase](https://firebase.google.com/), as a means of exploring and demonstrating the capabilities of that platform.

Repo for this project here: https://github.com/triyuga/firebase-chat-ui

## Features

* Auth
    * Via Google
* Firestore database

## Todo

Some ideas about what to add next
* Another auth type
* A Firestorm function app
* An additional, nested data model, using [subcollections](https://firebase.google.com/docs/firestore/data-model#subcollections)
* Other ideas from [100 Firebase Tips, Tricks, and Screw-ups](https://www.youtube.com/watch?v=iWEgpdVSZyg&ab_channel=Fireship)
* Move firebase config into environment config files
* Deploy the app to 2 or more environments: `dev` and `prod`
* ...

## React App

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with the [typescript template](https://create-react-app.dev/docs/adding-typescript/)
* I have [enabled absolute imports](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)
* I am using [SASS](https://create-react-app.dev/docs/adding-a-sass-stylesheet/) with [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
* I have enabled prettier via [.prettierrc](./.prettierrc), [.vscode/settings.json](./.vscode/settings.json), and the [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code extension
