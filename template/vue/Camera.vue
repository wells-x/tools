<template>
    <section class="camera" v-loading="status === 1"
             :element-loading-text="'摄像头连接中'"
             :element-loading-background="'rgba(0, 0, 0, 0.8)'">
        <h2>{{userConfig.title}}</h2>
        <div class="video-box" :flex="`main:center cross:center`">
            <div :style="{width:`${userConfig.width*3}px`,height:`${userConfig.height*1.5}px`,}">
                <video v-show="status === 2 && !imgUrl" @click="videoClick"
                       :style="{width:`${userConfig.width}px`,maxHeight:`${userConfig.height*2}px`,}"
                       ref="cam" title="拍照"
                       autoplay></video>
                <!--<img :src="imgUrl" class="single-img" v-if="!multiple && imgUrl" title="重拍"/>-->
                <figure class="single-img" @click="videoClick" v-if="!userConfig.multiple && imgUrl">
                    <img :src="imgUrl" title="重拍"/>
                </figure>

            </div>
            <!--:style="`max-height: ${this.videoConfig.height}px;`"-->
            <transition v-if="userConfig.multiple" name="width-change">
                <ul class="img-list-box" v-if="imgSrcList.length">
                    <li class="img-box" :style="`max-height: ${userConfig.height}px;`">
                        <el-tooltip placement="left"
                                    v-for="(img,i) in imgSrcList"
                                    :key="i" :enterable="false">
                            <figure slot="content" class="img-view">
                                <img :src="img.imgData" alt=""/>
                            </figure>
                            <figure :class="{checked:img.isCheck}"
                                    @click="img.isCheck = !img.isCheck">
                                <img :src="img.imgData" alt=""/>
                                <i @click="removeImg(i)" class="el-icon-close"></i>
                            </figure>
                        </el-tooltip>
                    </li>
                </ul>
            </transition>
        </div>
        <div class="button-box" flex="main:center cross:center">
            <el-button v-if="status === 2 && !imgUrl"
                       @click="getPhoto" type="primary">拍照
            </el-button>
            <el-button v-if="status === 2 && imgUrl"
                       @click="imgUrl = ''" type="primary">重拍
            </el-button>
            <el-button v-if="userConfig.multiple && status !== 1" type="success"
                       :title="exportDisabled ? '暂无选中图片' : ''"
                       :disabled="exportDisabled" @click="exportPhotos">导出已选
            </el-button>
            <el-button v-if="!userConfig.multiple" type="success"
                       :title="!imgUrl ? '拍照后才能导出' : '点击导出'"
                       @click="exportPhotos">确认选择
            </el-button>
            <el-button v-if="status !== 2"
                       @click="init"
                       icon="el-icon-refresh">重启
            </el-button>
            <!--<el-button v-if="status === 2" @click="closeCamare(0)"-->
            <!--type="danger">关闭-->
            <!--</el-button>-->
        </div>
    </section>
</template>
<script>
    /**
     * @author xiaoqiang
     * @date 2018/8/17
     * @description: 导出
     * @return imgList 导出的imglist this.$emit('getImgList', [imgList]);
     * @example  <camera :config="{multiple:false,height:500,title:'标题',width: 600}" @get-img-list="getImgList"></camera>
     */
    // import lodash from 'lodash'

    // const {isBoolean} = lodash;
    export default {
        name: "Camera",
        props: {
            config: {
                default () {
                    return {
                        multiple: false
                    };
                },
                required: false
            }
        },
        data () {
            return {
                tryTime: 3,
                status: 0,
                videoConfig: {
                    width: 800,
                    height: 600,
                    title: '',
                },
                statusList: ['close', 'loading', 'success', 'error'],
                imgSrcList: [],
                imgUrl: '',
                streams: [],
                stream: null,
                isinit: false,  // 保证只存在一个stream
            }
        },
        mounted () {
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    let getUserMedia = navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;
                    if (!getUserMedia) {
                        return Promise.reject(new Error('系统调用摄像头失败'));
                    }
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            this.isinit = false;
            this.init();
        },
        computed: {
            exportDisabled () {
                return !this.checkPhotos().length;
            },
            userConfig () {
                return Object.assign({}, this.videoConfig, this.$props.config)
            },
        },
        methods: {
            init () {
                this.tryTime = 3;
                this.initCamare();
            },
            initCamare () {
                // if (this.stream)  this.stream.start();
                const {width, height} = this.userConfig;
                if (this.isinit) return;
                this.isinit = true;
                this.status = 1;
                navigator.mediaDevices.getUserMedia({video: {width: width * 2, height: height * 2}})
                    .then(stream => {
                        let _stream =
                            typeof stream.stop === 'function' ?
                                stream :
                                stream.getTracks()[0];
                        this.clearStreams();
                        // console.log(_stream);
                        this.$nextTick(() => {
                            this.imgUrl = '';
                        });
                        // this.streams.push(_stream);
                        this.stream = _stream;
                        let video = this.$refs.cam;
                        if ("srcObject" in video) {
                            video.srcObject = stream;
                        } else {
                            video.src = window.URL &&
                                URL.createObjectURL(stream) || stream;
                        }
                        this.status = 2;
                        this.tryTime = 1;
                        this.isinit = false;
                    })
                    .catch(() => {
                        // console.log(e);
                        setTimeout(() => {
                            this.isinit = false;
                            if (this.tryTime < 0) {
                                this.$message.error('未能连接至摄像头');
                                this.closeCamare(3);
                                this.tryTime = 2;
                                return
                            }
                            this.tryTime--;
                            this.initCamare();
                        }, 1000);
                    });

                navigator.mediaDevices.ondevicechange = () => {
                    this.initCamare();
                    this.status !== 1 && this.$message.error('摄像头出了问题，检查后尝试重启')
                }
            },
            clearStreams () {
                /*this.streams.forEach((item) => {
                    item && item.stop();
                    item = null;
                });
                this.streams = [];*/
                this.stream && this.stream.stop();
                this.stream = null;
                // console.log(this.stream);
            },
            closeCamare (status = '') {
                const {multiple} = this.userConfig;
                this.status !== 2 || multiple || this.imgUrl || this.getPhoto();
                this.clearStreams();
                status === '' || (this.status = status || 0);
                this.$emit('get-img-list', []);
            },
            checkPhotos () {
                let imgList = [];
                this.imgSrcList.forEach(({isCheck, imgData}) => {
                    isCheck && imgList.push(imgData)
                });
                return imgList;
            },
            exportPhotos () {
                this.getPhoto();
                let photos = this.multiple ?
                    this.checkPhotos() : [this.imgUrl];
                if (!photos.length || !photos[0])
                    return this.$message.error('未选择图片');
                this.$emit('get-img-list', photos);
            },
            removeImg (index) {
                this.imgSrcList.splice(index, 1);
            },
            videoClick () {
                switch (this.status) {
                    case 0:
                        this.init();
                        break;
                    case 2:
                        this.imgUrl ?
                            this.imgUrl = '' :
                            this.getPhoto();
                        break;
                    default:
                        console.log(this);
                }
            },
            getPhoto () {
                let video = this.$refs.cam,
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    {width, height, multiple} = this.userConfig;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(video, 0, 0, width, height);

                multiple ?
                    this.imgSrcList.unshift(new ImgBox({imgData: canvas.toDataURL('image/png')})) :
                    this.imgUrl = canvas.toDataURL('image/png');
                canvas = null;
            },
        },
        beforeDestroy () {
            this.closeCamare();
        },
    }

    class ImgBox {
        constructor ({imgData} = {}) {
            this.imgData = imgData;
            // this.isCheck = false;
        }

    }

</script>

<style lang="scss" scoped>
    .width-change-enter-active,
    .width-change-leave-active {
        transition: all .3s ease-in;
    }

    .width-change-leave-to,
    .width-change-enter {
        width: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    /*
        .width-change-enter-to,
        .width-change-leave {
            width: 300px;
        }
    */
    img {
        max-width: 100%;
        /*max-height: 100%;*/
    }

    section.camera {
        display: flex;
        min-height: 300px;
        flex-direction: column;
        justify-content: space-around;
        /*padding: 10px 0 0;*/
        h2 {
            text-align: center;
            line-height: 3em;
        }
        .video-box {
            text-align: center;
            position: relative;
            /*justify-content: space-around;*/
            video {
                display: inline-block;
                max-width: 70%;
                cursor: pointer;
                background: #fff;
                z-index: 200;
            }
            .single-img {
                display: block;
                max-width: 70%;
                padding: 0;
                margin: 0 auto;
                img {
                    /*text-align: center;*/
                    /*cursor: pointer;*/
                }
            }
            .img-list-box {
                display: block;
                padding: 0;
                margin: 0 0 0 20px;
                width: 25%;
                max-width: 200px;
                background: rgba(0, 0, 0, 0.65);
                scroll-behavior: smooth;
                .img-box {
                    display: block;
                    overflow: auto;
                    height: 100%;
                    user-select: none;
                    margin: 0;
                    padding: 10px;
                    &::-webkit-scrollbar {
                        width: 2px;
                        height: 0;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 0;
                    }
                    figure {
                        display: block;
                        width: 90%;
                        overflow: hidden;
                        text-align: center;
                        padding: 10px;
                        margin: 0;
                        position: relative;
                        &.checked {
                            position: relative;
                            background: #00ff00;
                            &:before {
                                content: '';
                                position: absolute;
                                right: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(255, 255, 255, 0.2);
                            }
                        }
                        &:not(:first-child) {
                            margin-top: 1%;
                        }
                        i {
                            position: absolute;
                            /*display: none;*/
                            right: 14px;
                            top: 12px;
                            z-index: 500;
                            font-size: 24px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.8);
                            opacity: 0;
                            transition: opacity .3s;
                            cursor: pointer;
                        }
                        &:hover {
                            i {
                                opacity: 1;
                                /*display: block;*/
                            }
                        }

                    }
                }
            }
        }
        .button-box {
            height: 60px;
        }
    }

    .img-view {
        max-width: 600px;
        max-height: 600px;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>
