import request from '../utils/request';

//判断是否登陆
export const toJudgeLogin = async () => {
    const url = `/judge`;
    return request(url);
}

//登陆
export const goSignin = async (paload) => {
    const url = `/manager/signin`;
    const options = {
        method:'post',
        headers:{'Content-Type':'application/json'},
        data:paload, //{username,password}
    }
    return request(url, options);
};

//退出
export const goSignout = async () => {
    const url = `/manager/signout`;
    return request(url);
};

//获取信息
export const getManageMessage = async () => {
    const url = '/manager/showMessage'
    return request(url);
}

//编辑信息
export const saveManageMessage = async (payload) => {
    const url = '/manager/editMessage'
    const options = {
        method: "post",
        headers: {"Content-Type": "application/json"},
        data: payload
    }
    return request(url, options)
}