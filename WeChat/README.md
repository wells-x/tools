# 微信

## 打电话功能
> 可以通过 加 '#mp.weixin.qq.com' 兼容
```html
<a href="tel:12345676#mp.weixin.qq.com">微信内调起电话解决方式</a>
```


## 微信调整字体大小
> 微信webview内置了调整字体大小的功能，用户可以根据实际情况进行调节。

>>但是这也会导致字体大小改变以后，出现页面布局错乱的情况，目前iOS的解决方案是覆盖掉微信的样式：

```
body { /* IOS禁止微信调整字体大小 */
    -webkit-text-size-adjust: 100% !important;
}
```


>>安卓的解决方案是通过 WeixinJSBridge 对象将网页的字体大小设置为默认大小，并且重写设置字体大小的方法，让用户不能在该网页下设置字体大小：

``` javascript

    /*
  * android禁止微信浏览器调整字体大小

  *  这种方法会导致网页延迟大约1S

  */
    (function () {

        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {

            handleFontSize();

        } else {
            if (document.addEventListener) {

                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);

            } else if (document.attachEvent) {

                document.attachEvent("WeixinJSBridgeReady", handleFontSize);

                document.attachEvent("onWeixinJSBridgeReady", handleFontSize);

            }

        }

        function handleFontSize() {

            // 设置网页字体为默认大小
            WeixinJSBridge.invoke('setFontSizeCallback', {

                'fontSize': 0

            });


            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function () {

                WeixinJSBridge.invoke('setFontSizeCallback', {

                    'fontSize': 0

                });

            });

        }
    })();
```
