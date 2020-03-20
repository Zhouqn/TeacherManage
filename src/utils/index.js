import request from './request.js'

const makeAge = function(str,timerStr){
    let howAgo = new Date(timerStr);
    let now = new Date();
    let yearMinus = now.getFullYear() - howAgo.getFullYear();
    let monthMinus = now.getMonth() - howAgo.getMonth();
    let dateMinus = now.getDate() - howAgo.getDate();

    let msg;
    if(yearMinus != 0){
        if(str == "birthDay"){
            msg = yearMinus + '岁';
        }else{
            msg = yearMinus + '年';
        }
    }else if(monthMinus != 0){
        msg = monthMinus + '月';
    }else if(dateMinus !=0 ){
        msg = dateMinus + '天'
    }

    return msg;
};

export {
    request,
    makeAge,
}

