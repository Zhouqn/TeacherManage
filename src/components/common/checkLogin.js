import React,{Component} from "react";
import {connect} from "dva";


export function checkLogin(TeacherList){
    class Tmp extends Component {

        render(){
            //判断用户登录，没有登录就不返回组件
            let isLogin = JSON.parse(window.sessionStorage.getItem('user') || 'false');
            if(!isLogin){
                alert('没有登录ya,请先登录');
                //页面跳转
                window.location.href = '/signin';
                return null;
            }

            return <TeacherList/>
        }
    }
    return  connect(state=>{
        return {
            isLogin:state.teacher.isLogin,
        }
    })(Tmp);
}

export default checkLogin;

