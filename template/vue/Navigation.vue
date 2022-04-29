<template>
    <ul>
        <li>不可思议的CSS</li>
        <li>导航栏</li>
        <li>光标小下划线跟随</li>
        <li>PURE CSS</li>
        <li>Nav Underline</li>
    </ul>
</template>

<script>
    /**
     * 纯CSS导航栏下划线跟随效果
     * @author wells
     * @date 2018/10/12
     * @desc 从前端大全学来 公众号
     */
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
    ul {
        display: block;
        width: 800px;
        text-align: center;
        margin: 0 auto;
        line-height: 50px;
        font-size: 0;
    }

    ul li {
        display: inline-block;
        position: relative;
        font-family: Consolas, sans-serif;
        font-size: 14px;
        padding: 0 20px;
        cursor: pointer;
    }

    ul li::before {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 100%;
        border-bottom: 2px solid #000;
        transition: all .2s .05s;
    }

    ul li:hover::before {
        left: 0;
        width: 100%;
    }

    ul li:hover ~ li::before {
        left: 0;
    }
</style>
