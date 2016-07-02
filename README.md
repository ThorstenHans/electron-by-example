## Electron Angular2 Sample App

Just a simple Angular2 App packaged using Electron. 

Augury integration (has to be installed locally inside of chrome) and you've to update `electron/index.js` look for the `auguryPath` variable and assign your local path. 

Read this post for more information on how to find the right augury path [https://www.xplatform.rocks/2016/07/02/using-augury-inside-of-your-electron-apps/](https://www.xplatform.rocks/2016/07/02/using-augury-inside-of-your-electron-apps/).

## Running the sample

```
$ npm install
$ npm run gulp
$ open build
```

Choose the app for your platform from the `build` folder and start it.