import React,{Component} from 'react';
import {connect} from 'dva';
import { makeAge } from '../utils'

class MyMessage extends Component {

    static defaultProps =  {
        teacherManager:{
            id:'',
            username:'',
            gender:0,
            birthDay:'',
            address:'',
            telephone:'',
            position:'',
            joinDate: '',
            email:'',
            decManager:'',
        }
    };
    //加载个人信息
    componentDidMount() {
        let user = JSON.parse(window.sessionStorage.getItem('user') );
        this.myMessage(user.id);
    }
    myMessage(id_M) {
        this.props.dispatch({type:'teacherManager/myMessage',payload:{id_M:id_M}});
    }

    render() {
        let {teacherManager} = this.props;
        return (
            <React.Fragment>
                <div className="body teacher-list">

                    <ol className="breadcrumb">
                        <li className="active"><i className="fa fa-newspaper-o" ></i>个人信息</li>
                    </ol>
                    <form className="form-horizontal" id="myMessage">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">id<i className = "fa fa-info-circle"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.id}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">姓名<i className = "fa fa-id-badge"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.username}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">性别<i className = "fa fa-male"></i><i className = "fa fa-female"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.gender == 0 ? '男':'女'}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">出生日期<i className = "fa fa-calendar"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.birthDay}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">年龄<i className = "fa fa-calendar-o"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{makeAge("birthDay",teacherManager.birthDay)}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">籍贯<i className = "fa fa-globe"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.address}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">电话<i className = "fa fa-mobile"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.telephone}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">职位<i className = "fa fa-file-word-o"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.position}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">入职时间<i className = "fa fa-calendar"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.joinDate}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">工龄<i className = "fa fa-calendar-o"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{makeAge("joinDate",teacherManager.joinDate)}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email<i className = "fa fa-mail-forward"></i></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{teacherManager.email}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">描述<i className = "fa fa-file-text-o"></i></label>
                            <div className="col-sm-10" >
                                <p className="form-control-static">{teacherManager.decManager}</p>
                            </div>
                        </div>
                    </form>

                </div>
            </React.Fragment>
        )
    }
}

export default connect(state=>{
    return {
        teacherManager:state.teacherManager.teacherManager,
    }
})(MyMessage)