<template>
    <div translate="no" class="body">
        <div class="content">
            <canvas class="snow" id="snow" width="1349" height="400"></canvas>
            <div class="main-text">
                <h1>天啊！那页走丢了。。。</h1>
                <div class="main-text-a">
                    <router-link class="home-link" to="/"> 先去首页看看 ？</router-link>
                </div>
            </div>
            <div class="ground">
                <div class="mound">
                    <div class="mound_text">404</div>
                    <div class="mound_spade"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {

        data () {
            return {}
        },
        mounted () {
            (function () {
                function ready (fn) {
                    if (document.readyState !== 'loading') {
                        fn();
                    } else {
                        document.addEventListener('DOMContentLoaded', fn);
                    }
                }

                function makeSnow (el) {
                    let ctx = el.getContext('2d'),
                        width = 0,
                        height = 0,
                        particles = [],
                        Particle = function () {
                            this.x = this.y = this.dx = this.dy = 0;
                            this.reset();
                        };

                    Particle.prototype.reset = function () {
                        this.y = Math.random() * height;
                        this.x = Math.random() * width;
                        this.dx = (Math.random()) - 0.5;
                        this.dy = (Math.random() * 0.5) + 0.5;
                    };

                    function createParticles (count) {
                        if (count !== particles.length) {
                            particles = [];
                            for (let i = 0; i < count; i++) {
                                particles.push(new Particle());
                            }
                        }
                    }

                    function onResize () {
                        width = window.innerWidth;
                        height = window.innerHeight;
                        el.width = width;
                        el.height = height;

                        createParticles((width * height) / 10000);
                    }

                    function updateParticles () {
                        ctx.clearRect(0, 0, width, height);
                        ctx.fillStyle = '#f6f9fa';

                        particles.forEach(function (particle) {
                            particle.y += particle.dy;
                            particle.x += particle.dx;

                            if (particle.y > height) {
                                particle.y = 0;
                            }

                            if (particle.x > width) {
                                particle.reset();
                                particle.y = 0;
                            }

                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
                            ctx.fill();
                        });

                        window.requestAnimationFrame(updateParticles);
                    }

                    onResize();
                    updateParticles();
                }

                ready(function () {
                    let canvas = document.getElementById('snow');
                    makeSnow(canvas);
                });
            })();

        }


    }

</script>


<style scoped>
    .body {
        height: 100%;
        min-height: 450px;
        font-size: 32px;
        font-weight: 500;
        color: #5d7399;
        margin: 0;
        padding: 0;
        border: 0;
    }

    .content {
        height: 100%;
        position: relative;
        z-index: 1;
        background-color: #d2e1ec;
        background-image: -webkit-linear-gradient(top, #bbcfe1 0, #e8f2f6 80%);
        background-image: linear-gradient(to bottom, #bbcfe1 0, #e8f2f6 80%);
        overflow: hidden;
    }

    .snow {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 20;
    }

    .main-text {
        padding: 20vh 20px 0 20px;
        text-align: center;
        line-height: 2em;
        font-size: 4vh;
    }

    .main-text h1 {
        font-size: 0.6rem;
        line-height: 60px;
        margin: 0;
        padding: 0;
    }

    .main-text-a {
        height: 32px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .main-text-a a {
        font-size: 16px;
        text-decoration: none;
        color: #0066CC;
    }

    .main-text-a a:hover {
        color: #000;
    }

    .home-link {
        font-size: 0.6em;
        font-weight: 400;
        color: inherit;
        text-decoration: none;
        opacity: 0.6;
        border-bottom: 1px dashed rgba(93, 115, 153, 0.5);
    }

    .home-link:hover {
        opacity: 1;
    }

    .ground {
        height: 160px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #f6f9fa;
        box-shadow: 0 0 10px 10px #f6f9fa;
    }

    .ground:before, .ground:after {
        content: '';
        display: block;
        width: 250px;
        height: 250px;
        position: absolute;
        top: -62.5px;
        z-index: -1;
        background: transparent;
        -webkit-transform: scaleX(0.2) rotate(45deg);
        transform: scaleX(0.2) rotate(45deg);
    }

    .ground:after {
        left: 50%;
        margin-left: -2.222222rem;
        box-shadow: -4.533333rem 3.466667rem 0.2rem #b0bccf, -8.266667rem 7.733333rem 0.2rem #8193b2, -12.0rem 12.0rem 0.2rem #b0bccf, -15.4rem 16.6rem 0.2rem #b4bed1, -20.2rem 19.8rem 0.2rem #8193b2, -23.4rem 24.6rem 0.2rem #8a9bb8, -27.333333rem 28.666667rem 0.2rem #91a1bc, -32.333333rem 31.666667rem 0.2rem #bac4d5, -35.933333rem 36.066667rem 0.2rem #a1aec6, -40.266667rem 39.733333rem 0.2rem #8193b2, -44.2rem 43.8rem 0.2rem #94a3be, -47.4rem 48.6rem 0.2rem #9aa9c2, -52.133333rem 51.866667rem 0.2rem #b0bccf, -55.733333rem 56.266667rem 0.2rem #bac4d5, -60.466667rem 59.533333rem 0.2rem #a7b4c9, -64.533333rem 63.466667rem 0.2rem #94a3be;
    }

    .ground:before {
        right: 50%;
        margin-right: -2.222222rem;
        box-shadow: 4.333333rem -3.666667rem 0.2rem #879fc5, 8.266667rem -7.733333rem 0.2rem #adb9cd, 12.333333rem -11.666667rem 0.2rem #a1aec6, 16.266667rem -15.733333rem 0.2rem #b7c1d3, 20.6rem -19.4rem 0.2rem #7e90b0, 23.933333rem -24.066667rem 0.2rem #b0bccf, 27.733333rem -28.266667rem 0.2rem #b7c1d3, 31.933333rem -32.066667rem 0.2rem #8e9eba, 36.4rem -35.6rem 0.2rem #b7c1d3, 39.933333rem -40.066667rem 0.2rem #9dabc4, 43.8rem -44.2rem 0.2rem #a1aec6, 48.266667rem -47.733333rem 0.2rem #8193b2, 51.733333rem -52.266667rem 0.2rem #aab6cb, 56.333333rem -55.666667rem 0.2rem #9dabc4, 60.133333rem -59.866667rem 0.2rem #8e9eba, 4785px -4815px 15px #a7b4c9;
    }

    .mound {
        margin-top: -.7rem;
        font-weight: 800;
        font-size: 2.4rem;
        text-align: center;
        color: #dd4040;
        pointer-events: none;
    }

    @media screen {
        .mound {
            /*font-size: 100px;*/
        }
    }

    .mound:before {
        content: '';
        display: block;
        width: 600px;
        height: 200px;
        position: absolute;
        left: 50%;
        margin-left: -300px;
        top: 50px;
        z-index: 1;
        border-radius: 100%;
        background-color: #e8f2f6;
        background-image: -webkit-linear-gradient(top, #dee8f1, #f6f9fa 60px);
        background-image: linear-gradient(to bottom, #dee8f1, #f6f9fa 60px);
    }

    .mound:after {
        content: '';
        display: block;
        width: 0.373333rem;
        height: 0.08rem;
        position: absolute;
        left: 50%;
        margin-left: -2.2rem;
        top: 1.58rem;
        z-index: 2;
        background: #dd4040;
        border-radius: 100%;
        -webkit-transform: rotate(-15deg);
        transform: rotate(-15deg);
        box-shadow: -0.746667rem 0.16rem 0 0.013333rem #dd4040, -1.68rem 0.08rem 0 0.026667rem #dd4040, -2.613333rem 0.32rem 0 0.04rem #dd4040;
    }

    .mound_text {
        transform: rotate(6deg);
    }

    .mound_spade {
        display: block;
        width: 1.0rem;
        height: 0.8rem;
        position: absolute;
        right: 50%;
        top: 25%;
        margin-right: -3.3rem;
        z-index: 0;
        -webkit-transform: rotate(35deg);
        transform: rotate(35deg);
        background: #dd4040;
    }

    .mound_spade:before, .mound_spade:after {
        content: '';
        display: block;
        position: absolute;
    }

    .mound_spade:before {
        width: 40%;
        height: 0.8rem;
        bottom: 98%;
        left: 50%;
        margin-left: -20%;
        background: #dd4040;
    }

    .mound_spade:after {
        width: 100%;
        height: 0.8rem;
        top: -1.466667rem;
        left: 0;
        box-sizing: border-box;
        border: 0.266rem solid #dd4040;
        border-radius: 0.106667rem 0.1053333rem 0.536667rem 0.536667rem;
    }
</style>
