# taobao-coupon-mobile
taobao-coupon-mobile

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 生成挂架屏json
webpack --config ./webpack.skeleton.conf.js

# 骨架屏注入
node skeleton.js

#注意，作为模板的html文件，需要在被写入内容的位置添加<!--vue-ssr-outlet-->占位符，本例子在div#app里写入：

<div id="app">
 <!--vue-ssr-outlet-->
</div>
```

## 请在谷歌网络浏览器下预览，解决axios跨域问题请在后端配置   windows谷歌浏览器属性目标后添加 --user-data-dir="c:\ChromeDebug" --test-type --disable-web-security
## 请在谷歌网络浏览器下预览，解决axios跨域问题请在后端配置   mac 命令行打开谷歌浏览器open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=自定义存储位置
###部分截图事例

open -n /Applications/Google\ Chrome.app/ --args --disable-web-security

The CLI moved into a separate package: webpack-cli
Please install 'webpack-cli' in addition to webpack itself to use the CLI
-> When using npm: npm i -D webpack-cli
-> When using yarn: yarn add -D webpack-cli
internal/modules/cjs/loader.js:628
    throw err;
    ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
