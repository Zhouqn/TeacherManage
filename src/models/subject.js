import { toGetSubjectList, toSearchSubject } from  '../services/subject'

let subject = {
    namespace:'subject',
    state:{
        subjects:[],
    },
    effects:{
        //搜索课程
        *searchSubject({payload},{put,call}){
            let res = yield call(toSearchSubject, payload);
            if(res.data.success){
                yield put({type:'showSubject',payload:{subjects:res.data.data.subjects}})
            }else {
                alert("课程信息不存在!")
            }
        },

        //获取课程信息
        *getSubjects({payload},{put,call}){
            let res = yield call(toGetSubjectList);
            if (res.data.success) {
                yield put({type:'showSubject',payload:{subjects:res.data.data.subjects}});
            }else {
                alert("无课程信息!")
            }
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