import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import router from './routers';  //默认查找index.js
import modelIndex from './models';
import teacherModel from './models/teacher';
import teacherManagerModel from "./models/teacherManager";
import subjectModel from "./models/subject"
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './assets/css/index.css';


//引入dva
import dva from 'dva';

//创建dva的实例app对象
let app = new dva({
    history:createHistory(),
});

//配置路由
app.router(router);

//安装插件
app.use(createLoading({
    namespace:'myloading', //默认loading没啥用
}));

//注册模块
app.model(modelIndex);
app.model(teacherModel);
app.model(teacherManagerModel);
app.model(subjectModel);

//app.start('')
app.start('#root');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
