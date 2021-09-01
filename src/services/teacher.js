import request from '../utils/request';

//获取教师信息
export const toGetTeacherList = async (payload) => {
    const {page, count, query} = payload
    const url = `/teacher/list?page=${page}&count=${count}&query=${query}`;
    return request(url);
};

//获取某个教师信息
export const toGetOneTeacher = async (payload) => {
    const {t_id} = payload
    const url = `/teacher/getOne/${t_id}`;
    return request(url);
};

//添加信息
export const toAddTeacher = async (payload) => {
    const url = `/teacher/add`;
    const options = {
        method:'post',
        headers: {"Content-Type": "application/json"},
        data: payload
    }
    return request(url, options);
};

//编辑信息
export const toEditTeacher = async (payload) => {
    const url = `/teacher/edit`;
    const options = {
        method:'post',
        headers: {"Content-Type": "application/json"},
        data: payload
    }
    return request(url, options);
};

//删除教师信息
export const toDeleteTeacher = async (payload) => {
    const t_id = payload.t_id
    const url = `/teacher/delete?id=${t_id}`
    return request(url)
}
