# electron
> package.json
````javascript
{
  "name": "sss-name-vue",
  "version": "0.0.1",
  "author": "sss",
  "description": "An electron-vue project",
  "license": null,
  "main": "./dist/electron/main.js",
  "scripts": {
    "build": "node .electron-vue/build.js && electron-builder",
    "build:win32": "cross-env BUILD_TARGET=win32 node .electron-vue/build.js && electron-builder --win --ia32",
    "build:darwin": "cross-env BUILD_TARGET=darwin node .electron-vue/build.js && electron-builder",
    "build:linux": "cross-env BUILD_TARGET=linux node .electron-vue/build.js && electron-builder",
    "build:mas": "cross-env BUILD_TARGET=mas node .electron-vue/build.js && electron-builder",
    "build:dir:dev": "node .electron-vue/release.js && electron-builder --dir",
    "build:dir": "node .electron-vue/build.js && electron-builder --dir",
    "build:dir:win32": "cross-env BUILD_TARGET=win32 node .electron-vue/build.js && electron-builder --dir --win --ia32",
    "build:clean": "cross-env BUILD_TARGET=clean node .electron-vue/build.js",
    "build:web": "cross-env BUILD_TARGET=web node .electron-vue/build.js",
    "dev": "node .electron-vue/dev-runner.js",
    "pack": "npm run pack:main && npm run pack:renderer",
    "pack:main": "cross-env NODE_ENV=production webpack --progress --colors --config .electron-vue/webpack.main.config.js",
    "pack:renderer": "cross-env NODE_ENV=production webpack --progress --colors --config .electron-vue/webpack.renderer.config.js"
  },
  "build": {
    "publish": null,
    "productName": "name",
    "appId": "electron-vue",
    "directories": {
      "output": "build"
    },
    "files": [
      "other/**/*",          // 其他目录
      "dist/electron/**/*"
    ],
    "asarUnpack": [
      "other"                // 不打包的文件目录
    ],
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    "mac": {
      "icon": "build/icons/icon.icns"
    },
    "win": {
      "icon": "build/icons/xy.ico"
    },
    "linux": {
      "icon": "build/icons"
    }
  },
  "dependencies": {
    "vue": "^2.3.3",
    "vue-electron": "^1.0.6",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    ...
  },
  "devDependencies": {
    ...
  }
}

````
