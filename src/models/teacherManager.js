import request from "../utils/request";

let teacherManager = {
    namespace:'teacherManager',
    state : {
        teacherManager:{},
    },

    effects:{
        //管理员信息的保存
        *myMessageSave({payload},{put,call}){
            let res = yield call(request('/editManager.php',{
                method:'post',
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                data:payload.teacherManager,
            }));
        },
        //管理员信息的展示
        *myMessage({payload},{put,call}){
            let res = yield call(request('/myMessage.php',{params:{id_M: payload.id_M}}));
            yield put({type:'ManagerMessage',payload:{teacherManager:res.data.teacherManager}});
        },
    },

    reducers:{
        ManagerMessage(state,{payload}){
            return {
                teacherManager:payload.teacherManager,
            }
        },
    }
};

export default teacherManager;