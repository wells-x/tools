# 关于 vue-webpack配置的坑
> vue2.0 vue-cli 2.9

## config

### index.js

```` javascript
var path = require('path')

module.exports = {
  build: { // production 环境
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true, // 是否开启生产环境的 SourceMap
    // 开启后可以在浏览器 source -> webpack 目录中查看源代码
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
  },
  dev: { // dev 环境
    env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
    port: 8080, // 运行测试页面的端口
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {
      '/r': {
        target: 'http://example.com',
        changeOrigin: true,  // 是否跨域
        cookieDomainRewrite: 'localhost', // 设置跨域的 cookieDomain [链接](https://github.com/chimurai/http-proxy-middleware#http-proxy-options)
        pathRewrite: {
          '^/r/': '/'
        }
      }
    }, // 需要 proxyTable 代理的接口（可跨域）
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false // 是否开启 cssSourceMap
  }
}
````

> [设置代理](https://github.com/chimurai/http-proxy-middleware#http-proxy-options)


#### 错误提示

    > '^/r' 匹配方式 会导致 '/register' 页面被代理，直接转发至代理服务器 修改为 '^/r/'

## build

### utils.js

```` javascript

exports.cssLoaders = function (options) {

  ...

   const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap
      }
    },
    postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    };


  function generateLoaders(loader, loaderOptions) {

    const loaders = options.usePostCSS ?
      [postcssLoader] :
      [];
    loaders.push(cssLoader, px2remLoader);
    ...

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath : '../../',           // 打包后发现文件路径错误可以尝试修改成此方式 可解决css引入静态资源打包问题
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }

    ...

  }

  ...

};
````


# 附加

## webpack.dev.config.js
> vue-li 2.9 高版本可能存在问题
``` javascript
const devWebpackConfig = merge(baseWebpackConfig, {
  devServer {
    // ...
    disableHostCheck: true,             // 域名限制时添加可解决
    // ...
  }
});
```

## webpack.base.conf.js
``` javascript
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill','./src/main.js'] // npm install babel-polyfill --save; 并修改app入口文件配置
    // 解决ie等低版本浏览器 Promise undefined 问题
  },
  // ···
}
```

## vue-router
> mode: history
```` nginx
location / {
  try_files $uri $uri/ /index.html; // 使用history 模式，必须要设置 config. build. assetsPublicPath
}
````


## 开启gzip

### 安装webpack插件
```
npm compression-webpack-plugin --save-dev
```
### 开启gzip
> config/index.js
``` javascript
module.exports = {
  ...
  build: { // production 环境
    ...
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
  },
}

```
### nginx 配置

```
server {
    listen       80;
    server_name  www.xxx.com;
    root  /var/www/html/xxx;

    # 开启gzip
    gzip on;

    # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_min_length 1k;

    # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
    gzip_comp_level 1;

    # 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

    # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    # 禁用IE 6 gzip
    gzip_disable "MSIE [1-6]\.";

    # 设置压缩所需要的缓冲区大小
    gzip_buffers 32 4k;

    # 设置gzip压缩针对的HTTP协议版本
    gzip_http_version 1.0;


    # location / {
    #     index index.php index.html index.htm;
    # }

    # location / {
    #     try_files $uri $uri/ /index.html;
    # }

    location /r/ {
        proxy_pass http://xxx/r/;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }


}

```

## 列表

[uiGradients](http://uigradients.com/)

[CSSFX](https://cssfx.dev/)

[Faviator](https://www.faviator.xyz/)

[Postwoman](https://postwoman.io/)

[Vue Virtual Scroller](https://akryum.github.io/vue-virtual-scroller/)

[V Calendar](https://vcalendar.io)

[Vue Design System](https://vueds.com/)

[Proppy](https://proppyjs.com)

[Light Blue Vue Admin](https://flatlogic.com/templates/light-blue-vue-lite)

[Vue Content Loader](http://danilowoz.com/create-vue-content-loader)

[Echarts with Vue2.0](https://simonzhangiter.github.io/DataVisualization/#/dashboard)

[Vuetensils](https://vuetensils.stegosource.com/d)
