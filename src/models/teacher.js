import request from '../utils/request';
import {routerRedux} from 'dva/router'

let teacher = {
    namespace:'teacher',
    state: {
        isLogin:false,
        teachers:[],
        total:0,
        editingTeacher:{},
        q:'', //测试添加
        teacher: {},
        teacherManager:{}
    },

    effects: {
        //判断是否登录
        *judgeLogin({payload},{put,call}){
            let res = yield call(request('/judgeLogin.php'));
            if(res.data.errcode === 10001){
                yield put({type:'changeLogin',payload:{isLogin:false}});
            }else{
                yield put({type:'changeLogin',payload:{isLogin:true}});
            }
        },
        //不删除教师信息
        *notDeleteTeacher({payload},{put,call}){
            yield put(routerRedux.push('/home/list'));
        },
        //删除教师信息
        *deleteTeacher({payload},{put,call}){
            let res = yield call(request('/delete.php',{params:{_id:payload._id}}));
            yield put(routerRedux.push('/home/list'));
        },
        //跳转添加页面
        *addShow({payload},{put,call}){
            yield put(routerRedux.push('/home/add'));
        },
        //添加教师
        *addTeacher({payload},{put,call}){
            let res = yield call(request('/add.php',{
                method:'post',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                data:payload.teacher,
            }));
            yield put(routerRedux.push('/home/list'));
        },
        //输入框值改变
        *change({payload},{put,call}){
           let res = yield call(request('/teachers.php',{params:{query:payload.q}}));
           yield put({type: 'update', payload: {teachers: res.data.teachers, total: res.data.total}});
        },
        //保存教师信息
        *saveTeacher({payload},{put,call}){
            let res = yield call(request('/editTeacher.php',{
                method:'post',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                data:payload.teacher,
            }));
            yield put(routerRedux.push('/home/list'));
        },
        //展示教师信息
        *showTeacher({payload},{put,call}){
            let res = yield call(request('/editTeacher.php',{params:{_id:payload._id}}));
            yield put({type:'saveEditTeacher',payload:{teacher:res.data.teacher}});
            yield put(routerRedux.push('/home/edit'))
        },
        //搜索老师信息
        *search({payload},{select,put,call}){
            let res = yield call(request('/teachers.php',{params:{query:payload.q}}));
            yield put({type: 'update', payload: {teachers: res.data.teachers, total: res.data.total}});

        },
        //退出
        *signout({payload},{select,put,call}){
            let res = yield call(request('/signout.php',{
                method: 'post',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
            }));
            if( res.data.errcode === 0){
                yield put({ type:"changeLogin",payload:{ isLogin : false} });
                //页面跳转
                yield put(routerRedux.push('/signin'));
                window.sessionStorage.removeItem('user');
                return;
            }
            alert(res.data.errmsg);
        },
        //更新teachers
        *updateTeacher({payload},{select,put,call}) {
            try{
                var res = yield call(request('/teachers.php', {
                    params: payload
                }));
                yield put({type: 'update', payload: {teachers: res.data.teachers, total: res.data.total}});

            }catch (e) {
                console.log('捕获异常,不能发请求,没有登录');
            }
        },
        //登录
        *doLogin({payload},{select,put,call}){
            let res = yield call(request('/signin.php',{
                method:'post',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                data:payload, //{username,password}
            }));
            if(res.data.errcode !==0 ){
                return alert('用户名或密码错误');
            }
            //本地的session存储
            window.sessionStorage.setItem('user',JSON.stringify(res.data.user));
            //更改登录状态
            yield put({ type:'changeLogin',payload:{isLogin:true} });
            //跳转页面
            yield put(routerRedux.push('/home/list'));
        }
    },
    reducers: {
        saveEditTeacher(state,{payload}){
            return {
                teacher:payload.teacher,
            }
        },
        update(state,{payload}){
            return {
                teachers:payload.teachers,
                total:payload.total,
            }
        },
        changeLogin(state,{payload}) {
            return {
                isLogin : payload.isLogin
            }
        }
    },
};


export default teacher;