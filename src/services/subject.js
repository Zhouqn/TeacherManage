import request from '../utils/request';

//获取课程列表
export const toGetSubjectList = async () => {
    const url = `/subject/list`;
    return request(url);
};

//搜索课程
export const toSearchSubject = async (payload) => {
    const url = `/subject/search/${payload.query}`;
    return request(url);
}

