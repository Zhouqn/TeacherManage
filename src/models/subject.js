import request from "../utils/request";

let subject = {
    namespace:'subject',
    state:{
        subjects:[],
    },
    effects:{
        //搜索课程
        *searchSubject({payload},{put,call}){
            let res = yield call(request('/subjects.php',{params : {query:payload.query}}));
            yield put({type:'showSubject',payload:{subjects:res.data.subjects}})
        },
        //获取课程信息
        *getSubjects({payload},{put,call}){
            let res = yield call(request('/subjects.php'));
            yield put({type:'showSubject',payload:{subjects:res.data.subjects}});
        },
    },
    reducers:{
        showSubject(state,{payload}){
          return{
              subjects : payload.subjects
          }
        }
    }
};

export default subject;