# node

> 不支持 export import



# npm


> --registry

```
--registry=https://registry.npm.taobao.org
```

e.g.
``` bash
npm install --registry=https://registry.npm.taobao.org
```

## .npmrc

```
registry = https://registry.npm.taobao.org
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

## chromedriver
> chromedriver 安装失败

``` bash
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
```

## sass
> sass文件解析失败问题，不需要修改module.rules vue-loader.conf.js 配置很完善，只需要安装依赖

``` bash
npm install sass-loader node-sass vue-style-loader --save-dev
```

> node-sass 在上一步完成后依然报错问题
``` bash
npm rebuild node-sass
```
