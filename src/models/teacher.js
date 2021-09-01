import {routerRedux} from 'dva/router'
import {toGetTeacherList, toAddTeacher, toEditTeacher, toGetOneTeacher, toDeleteTeacher} from '../services/teacher'

let teacher = {
    namespace:'teacher',
    state: {
        teachers:[],
        page:1,
        count:5,
        total:0,
        totalPage:0,
        editingTeacher:{},
        q:'', //测试添加
        teacher: {},
        teacherManager:{}
    },

    effects: {
        //不删除教师信息
        *notDeleteTeacher({payload},{put,call}){
            yield put(routerRedux.push('/home/list'));
        },
        //删除教师信息
        *deleteTeacher({payload},{put,call}){
            let res = yield call(toDeleteTeacher,payload);
            if(res.data.success){
                window.location.href = '/home/list';
            }else {
                alert("删除教师失败！")
            }
        },
        //跳转添加页面
        *addShow({payload},{put,call}){
            yield put(routerRedux.push('/home/add'));
        },
        //添加教师
        *addTeacher({payload},{put,call}){
            let res = yield call(toAddTeacher,payload.teacher);
            if (res.data.success) {
                yield put(routerRedux.push('/home/list'));
            }else {
                alert("添加教师失败！")
            }

        },
        //保存教师信息
        *saveTeacher({payload},{put,call}){

            let res = yield call(toEditTeacher, payload.teacher);
            if(res.data.success) {
                yield put(routerRedux.push('/home/list'));
            }else {
                alert("教师信息修改失败！")
            }
        },
        //展示某个教师信息
        *showTeacher({payload},{put,call}){
            let res = yield call(toGetOneTeacher,payload);
            if (res.data.success) {
                yield put({type:'saveEditTeacher',payload:{teacher:res.data.data.teacher}});
                yield put(routerRedux.push('/home/edit'))
            }else {
                alert("教师信息获取失败！")
            }
        },

        //获取教师信息列表
        *getTeacherList({payload},{select,put,call}) {
            const res = yield call(toGetTeacherList, payload);
            if (res.data.success) {
                const {teachers, total, totalPage, page, count} = res.data.data
                yield put({type: 'update', payload: {teachers, total, totalPage, page, count}});
            }else {
                alert(res.data.message)
            }
        },

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
                totalPage:payload.totalPage,
                count:payload.count,
                page:payload.page
            }
        },
    },
};


export default teacher;