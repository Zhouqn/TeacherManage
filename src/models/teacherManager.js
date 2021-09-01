import {getManageMessage, goSignin, goSignout, saveManageMessage, toJudgeLogin} from "../services/teacherManage"
import {routerRedux} from "dva/router";

let teacherManager = {
    namespace:'teacherManager',
    state : {
        teacherManager:{},
        isLogin:false
    },

    effects:{
        //判断是否登录
        *judgeLogin({payload},{put,call}){
            let res = yield call(toJudgeLogin);
            if(res.data.isLogin){
                yield put({type:'changeLogin',payload:{isLogin:true}});
            }else{
                yield put({type:'changeLogin',payload:{isLogin:false}});
            }
        },

        //登录
        *doLogin({payload},{select,put,call}){
            let res = yield call(goSignin, payload)
            if(!res.data.success) {
                return alert('用户名密码错误！')
            }
            //跳转页面
            yield put(routerRedux.push('/home/list'));
        },

        //管理员信息的保存
        *myMessageSave({payload},{put,call}){
            let res = yield call(saveManageMessage, payload);
            if (res.data.success) {
                yield put(routerRedux.push('/home/mine'));
            }else {
                alert("信息修改失败！")
            }

        },

        //管理员信息的展示
        *myMessage({payload},{put,call}){
            let res = yield call(getManageMessage);
            if (res.data.success) {
                yield put({type:'ManagerMessage',payload:{teacherManager:res.data.data.manageInfo}});
            }else {
                alert("信息获取失败！")
            }
        },

        //退出
        *signout({payload},{select,put,call}){
            let res = yield call(goSignout)
            if(res.data.success){
                yield put(routerRedux.push('/signin'));
            }else {
                alert("退出失败！")
            }
        },

    },

    reducers:{
        ManagerMessage(state,{payload}){
            return {
                teacherManager:payload.teacherManager,
            }
        },
        changeLogin(state,{payload}) {
            return {
                isLogin : payload.isLogin
            }
        }
    }
};

export default teacherManager;