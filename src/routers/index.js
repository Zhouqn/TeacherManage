import React from "react";
//配置路由规则
import  { Router,Route,Switch,Redirect } from "dva/router";
import Home from '../components/Home.js'
import Signin from '../components/Signin.js'
import TeacherList from "../components/TeacherList.js";
import TeacherEdit from '../components/TeacherEdit.js';
import TeacherAdd from "../components/TeacherAdd";
import Loading from '../components/common/Loading.js'
import MyMessage from "../components/MyMessage";
import MyMessageEdit from "../components/MyMessageEdit";
import Subject from "../components/Subject";


const MyRoute = Route;
const homeSubRouters = [
                        {path:'/home/mine',component:MyMessage},
                        {path:'/home/list',component:TeacherList},
                        {path:'/home/edit',component:TeacherEdit},
                        {path:'/home/add',component:TeacherAdd},
                        {path:'/home/revise',component:MyMessageEdit},
                        {path:'/home/subject',component:Subject}
                        ];

let fn = function({history,app}){
    return (
        <Router history={history}>
            <div>
                <Loading/>
                <Switch>
                    <Route path="/home"  component={Home}/>
                    <Route path="/signin" exact component={Signin}/>
                    <Redirect to="/signin"/>  {/* 如果上面都不匹配就到这一条*/}
                </Switch>
            </div>
        </Router>
    )
};


export default fn;

export { homeSubRouters,MyRoute }