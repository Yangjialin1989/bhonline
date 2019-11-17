# demo

[TOC]



> 悲华在线官网项目

## Build Setup

## 一	前端设计 client

### 1.导航栏

| 序号 | router      | 栏目 | 英文       |      |
| :--- | ----------- | ---- | ---------- | ---- |
| 1    | /           | 首页 | index      |      |
| 2    | /hierophant | 导师 | hierophant |      |
| 3    | /buddhist   | 道场 | buddhist   |      |
| 4    | /sermon     | 教言 | sermon     |      |
| 5    | /track      | 缁行 | track      |      |
| 6    | /grace      | 慈宗 | grace      |      |
| 7    | /media      | 影音 | media      |      |
| 8    | /live       | 直播 | live       |      |
| 9    | /forum      | 论坛 | forum      |      |
| 10   | /contact    | 联系 | contact    |      |

### 2.模板  src/components

| 序号 | Vue          |            |      |      |
| ---- | ------------ | ---------- | ---- | ---- |
| 1    | Head.vue     | 头部       |      |      |
| 2    | Foot.vue     | 底部       |      |      |
| 3    | NavBread.vue | 面包屑导航 |      |      |
| 4    | Modal.vue    | 模态框     |      |      |
| 5    |              |            |      |      |
| 6    |              |            |      |      |
| 7    |              |            |      |      |
| 8    |              |            |      |      |
| 9    |              |            |      |      |

### 3.视图 src/views 

| 序号 | component      |      |             |      |
| ---- | -------------- | ---- | ----------- | ---- |
| 1    | Index.vue      | 首页 | /           |      |
| 2    | Hierophant.vue | 导师 | /hierophant |      |
| 3    | Buddhist.vue   | 道场 | /buddhist   |      |
| 4    | Sermon.vue     | 教言 | /sermon     |      |
| 5    | Track.vue      | 缁行 | /track      |      |
| 6    | Grace.vue      | 慈宗 | /grace      |      |
| 7    | Media.vue      | 影音 | /media      |      |
| 8    | Live.vue       | 直播 | /live       |      |
| 9    | Forum.vue      | 论坛 | /forum      |      |
| 10   | Contact.vue    | 联系 | /Contact    |      |





## 二	后端设计 server

### 1.数据库 MongoDB



### 2.数据接口 /api



``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
