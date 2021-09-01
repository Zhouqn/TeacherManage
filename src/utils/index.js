import request from './request.js'

const makeAge = function(str,timerStr){
    let howAgo = new Date(timerStr);
    let now = new Date();
    let yearMinus = now.getFullYear() - howAgo.getFullYear();
    let monthMinus = now.getMonth() - howAgo.getMonth();
    let dateMinus = now.getDate() - howAgo.getDate();

    let msg;
    if(yearMinus !== 0){
        if(str === "birthDay"){
            msg = yearMinus + '岁';
        }else{
            msg = yearMinus + '年';
        }
    }else if(monthMinus !== 0){
        msg = monthMinus + '月';
    }else if(dateMinus !== 0 ){
        msg = dateMinus + '天'
    }

    return msg;
};

const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export {
    request,
    makeAge,
    formatDate
}

