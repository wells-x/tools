<template>
    <div class="container">
        <!--<link rel="stylesheet" :href="iconfont"/>-->
        <!--<link rel="stylesheet" :href="fontFamily"/>-->
        <!--<link rel="stylesheet" href="../../../static/css/stylesheet.css"/>-->
        <div class="pad-top">
            <div class="text-center">
                <h1> What have you done? </h1>
                <h5> Now Go Back Using Below LInk</h5>
                <span class="num-box"></span>
                <h2>! ERROR DECETED !</h2>
            </div>
        </div>
        <div class="text-center pad-bottom">
            <div>
                <h3><i class="iconfont icon-lightbulb"></i></h3>
                <router-link to="/" class="btn btn-primary">GO TO HOME PAGE</router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import './assets/css/iconfont.css';
    import './assets/css/stylesheet.css';

    export default {

        data () {
            return {
                countUp: null,
                // fontFamily,
                // iconfont,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                if (this.countUp) return this.countUp.reset();

                function CountUp (target, startVal, endVal, decimals, duration, options) {

                    // default options
                    this.options = options || {
                        useEasing: true, // toggle easing
                        useGrouping: true, // 1,000,000 vs 1000000
                        separator: ',', // character to use as a separator
                        decimal: '.' // character to use as a decimal
                    };

                    // make sure requestAnimationFrame and cancelAnimationFrame are defined
                    // polyfill for browsers without native support
                    // by Opera engineer Erik Möller
                    let lastTime = 0;
                    let vendors = ['webkit', 'moz', 'ms'];
                    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                        window.cancelAnimationFrame =
                            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                    }
                    if (!window.requestAnimationFrame) {
                        window.requestAnimationFrame = function (callback,) {
                            let currTime = new Date().getTime();
                            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
                            let id = window.setTimeout(function () {
                                    callback(currTime + timeToCall);
                                },
                                timeToCall);
                            lastTime = currTime + timeToCall;
                            return id;
                        }
                    }
                    if (!window.cancelAnimationFrame) {
                        window.cancelAnimationFrame = function (id) {
                            clearTimeout(id);
                        }
                    }

                    let self = this;

                    this.d = (typeof target === 'string') ? document.querySelector(target) || document.querySelector(`#${target}`) : target;
                    this.startVal = Number(startVal);
                    this.endVal = Number(endVal);
                    this.countDown = this.startVal > this.endVal;
                    this.startTime = null;
                    this.timestamp = null;
                    this.remaining = null;
                    this.frameVal = this.startVal;
                    this.rAF = null;
                    this.decimals = Math.max(0, decimals || 0);
                    this.dec = Math.pow(10, this.decimals);
                    this.duration = duration * 1000 || 2000;

                    // Robert Penner's easeOutExpo
                    this.easeOutExpo = function (t, b, c, d) {
                        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
                    };
                    this.count = function (timestamp) {

                        if (self.startTime === null) self.startTime = timestamp;

                        self.timestamp = timestamp;

                        let progress = timestamp - self.startTime;
                        self.remaining = self.duration - progress;

                        // to ease or not to ease
                        if (self.options.useEasing) {
                            if (self.countDown) {
                                let i = self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
                                self.frameVal = self.startVal - i;
                            } else {
                                self.frameVal = self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration);
                            }
                        } else {
                            if (self.countDown) {
                                let i = (self.startVal - self.endVal) * (progress / self.duration);
                                self.frameVal = self.startVal - i;
                            } else {
                                self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
                            }
                        }

                        // decimal
                        self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

                        // don't go past endVal since progress can exceed duration in the last frame
                        if (self.countDown) {
                            self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
                        } else {
                            self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
                        }

                        // format and print value
                        self.d.innerHTML = self.formatNumber(self.frameVal.toFixed(self.decimals));

                        // whether to continue
                        if (progress < self.duration) {
                            self.rAF = requestAnimationFrame(self.count);
                        } else {
                            if (self.callback != null) self.callback();
                        }
                    };
                    this.start = function (callback) {
                        self.callback = callback;
                        // make sure values are valid
                        if (!isNaN(self.endVal) && !isNaN(self.startVal)) {
                            self.rAF = requestAnimationFrame(self.count);
                        } else {
                            console.log('CountUp error: startVal or endVal is not a number');
                            self.d.innerHTML = '--';
                        }
                        return false;
                    };
                    this.stop = function () {
                        cancelAnimationFrame(self.rAF);
                    };
                    this.reset = function () {
                        self.startTime = null;
                        cancelAnimationFrame(self.rAF);
                        self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
                    };
                    this.resume = function () {
                        self.startTime = null;
                        self.duration = self.remaining;
                        self.startVal = self.frameVal;
                        requestAnimationFrame(self.count);
                    };
                    this.formatNumber = function (nStr) {
                        nStr += '';
                        let x, x1, x2, rgx;
                        x = nStr.split('.');
                        x1 = x[0];
                        x2 = x.length > 1 ? self.options.decimal + x[1] : '';
                        rgx = /(\d+)(\d{3})/;
                        if (self.options.useGrouping) {
                            while (rgx.test(x1)) {
                                x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
                            }
                        }
                        return x1 + x2;
                    };

                    // format startVal on initialization
                    self.d.innerHTML = self.formatNumber(self.startVal.toFixed(self.decimals));
                }

                this.countUp = new CountUp(".num-box", 0, 404, 0, 2);
                this.countUp.start();
            },
        }
    }

</script>
<style scoped>

    * {
        font-family: 'Nova Flat', sans-serif;
    }

    .container {
        background-color: #B396FF;
        color: #fff;
        height: 100%;
        font-size: 10vh;
    }

    .pad-top {
        padding-top: 60px;
        font-size: 32px;
        height: 60vh;
        overflow: hidden;
    }

    .pad-top h1 {
        font-size: 1.6em;
    }

    .pad-top h5 {
        font-size: .4em;
        padding: 4vh 0;
    }

    .pad-bottom {
        height: 40vh;
        padding: 5vh 0;
    }

    .text-center {
        text-align: center;
        font-size: 36px;
        /*margin-top: 20px;*/
    }

    .text-center h3 {
        margin: 0 0 6vh;
    }

    .text-center h3 i {
        /*font-family: sans-serif, FontAwesome;*/
        font-family: iconfont, sans-serif;
        font-size: 20vh; /*no*/
    }

    .num-box {
        display: block;
        height: 25vh;
        font-size: 240px;
        line-height: 25vh;
        padding: 5vh 0;
    }

    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .btn-primary {
        color: #fff;
        background-color: #428bca;
        border-color: #357ebd;
    }

    .btn-primary:hover,
    .btn-primary:focus,
    .btn-primary:active {
        color: #fff;
        background-color: #3276b1;
        border-color: #285e8e;
    }

    .btn-primary:active {
        background-image: none;
    }

    .btn:focus {
        /*outline: thin dotted;*/
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
    }

    .btn:hover,
    .btn:focus {
        color: #333;
        text-decoration: none;
    }

    .btn:active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    }

    .btn[disabled] {
        pointer-events: none;
        cursor: not-allowed;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        box-shadow: none;
        opacity: .65;
    }
</style>
