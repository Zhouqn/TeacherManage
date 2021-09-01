//封装一个axios 的实例
import Axios from "axios";
import {serverHost,port} from '../config'

//创建一个新的实例
let r = Axios.create({
    baseURL:`${serverHost}:${port}/api/`,
    withCredentials:true, //允许客户端跨域的时候携带cookie
});

let request = function(url='',options={}){
    if(url === '') return Promise.reject('必须传递url');
    //返回promise对象返回去
    return r({
        url,
        method:'get',//method先给一个get请求
        ...options,  //option中有method就会覆盖
    })
};

export default request;