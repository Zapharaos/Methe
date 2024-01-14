# Methe

## Table of Contents

1. [Overview](#overview)
    1. [What exactly does this app?](#what-exaclty-does-this-app)
2. [Working with Methe](#working-with-methe)
   1. [How to set up and run this application](#how-to-set-up-and-run-this-application)
   2. [How to build and use the APK](#how-to-build-and-use-the-apk)

## Overview

![Our PacMan as GIF](documents/methe.gif)

Normal speed video accessible here : https://youtu.be/uvrZtxnpsi8

### What exaclty does this app?

This app was given to us within the framework of a project in the last year of our master's degree.

To achieve this, we decided to work with React Native and most specifically Expo. Expo allows to simplify the development process of mobile applications even more. It provides a variety of built-in services and has a relatively big community with some very useful tutorials. Since this was our first application, all those points were found to be very important to us.

The goal was to build a drinks related app (most of them being cocktails) using the following API : https://www.thecocktaildb.com/api.php

Important thing to mention : the API was very limited so we had to adapt our application and its functionalities accordingly. An upgrade to this app would be to provide our own API since we were very limited by it and couldn't provide the right translations or measures for example. It wasn't very performant as well.

We were tasked with the following :
- Cocktail displays
- Sort by Alcohol, by Type of preparation
- Search by ingredient
- Search by letter
- Management of favorite cocktails
- Cocktail sharing (SMS, Facebook, etc.)
- Random, highlighted cocktails
- Cache management (not a priority)
- UI / UX: very important in the rating (1/3 of the score)

In the end, our application provides :
- a home page. At first, it lists 10 random cocktails. As the end of the list is reached, it loads 10 more different cocktails. The list can display up to a total of 100 cocktails and, as the limit is reached, it offers the user to reset the list to 10 new random cocktails.
- a cocktail details page when the user opens up a cocktail from the list on the home page (or the favorite page). The user can share the cocktail recipe or add it to the favorites. It also displays the instructions.
- a settings page which allows the user to change the theme and the language. It supports both RTL and LTR.
- a favorite page which lists all the favorites cocktails. When a cocktail is added to the favorites, its id, name and image are added to the local storage.
- a search functionality which allows the users to search by ingredient name (the names are gotten through the API) or by name (or by first letter if it contains only one character).
- a filter functionality which allows to filter by category, glass type, ingredient or alcoholic status.

## Working with Methe

### How to set up and run this application

Install the Expo Go application and create an account : \
https://expo.dev/client

Install the Expo package : \
`npm install expo`

Login to your Expo account : \
`npx expo login`

Run the application : \
`npx run start`

Might encounter some issues related to your router, then run this command instead : \
`npx expo start --tunnel`

You can now scan the QR code using you mobile device or directly open the Expo Go app where your application should already be waiting for you.

### How to build and use the APK

To set up for the builds : \
`npm install -g eas-cli`

By now, you should already be connected to your account : \
`eas whoami`

If you are not connected yet, connect to your Expo account : \
`eas login`

Ready to go!

Build for android : \
`eas build -p android --profile androidApk`

Run the latest build : \
`eas build:run -p android --latest`
