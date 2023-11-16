import {request} from "@/config/Axios";
//每一个请求都被封装为一个实例

export function getCode(mobile){
    //http://localhost:8090/api/
    return request({
        url: '/member/sendCode',
        method: 'POST',
        data: {
            mobile: mobile,
        }
    })
}

export function loginReq(mobile,code){
    //http://localhost:8090/api/
    return request({
        url: '/member/login',
        method: 'POST',
        data: {
            mobile: mobile,
            code: code
        }
    })
}

// 发送保存的乘客的信息
export function savePassenger(passenger){
    //http://localhost:8090/api/
    return request({
        url: '/passenger/save',
        method: 'POST',
        data:{
            ...passenger
        }
    })
}

