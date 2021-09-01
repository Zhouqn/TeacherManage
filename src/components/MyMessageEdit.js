import React,{Component} from 'react';
import {connect} from 'dva';
import {formatDate} from '../utils'

let regPhone = /^1[3456789]\d{9}$/;
let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

class MyMessageEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signName:"",
            signEmail:"",
            signPhone:"",
        }
    }

    static defaultProps =  {
        // id , username,gender, birthDay, telephone, position, email, decManager, joinDate, address
        teacherManager:{
            id:'',
            username:'',
            gender:0,
            joinDate: '',
            birthDay:'',
            telephone:'',
            position:'',
            email:'',
            address:'',
            decManager:'',
        }
    };

    //加载个人信息
    componentDidMount() {
        this.myMessage();
    }
    myMessage() {
        this.props.dispatch({type:'teacherManager/myMessage',payload:{}});
    }
    //判断手机号和邮箱的正误
    isTrue(propname,value){
        if(propname === "email"){
            if(!(regEmail.test(value))){
                this.state.signEmail ='[ 电子邮箱为空或电子邮箱格式不正确! ]';
                this.setState({});
            }else{
                this.state.signEmail = '';
                this.setState({});
            }
        }
        if(propname === "telephone"){
            if(!(regPhone.test(value))){
                this.state.signPhone ='[ 手机号码为空或手机号码格式不正确! ]';
                this.setState({});
            }else{
                this.state.signPhone = '';
                this.setState({});
            }
        }
    }
    //判断名字是否为空
    isNull(propname,value){
        if(value === ""){
            if(propname==="username"){
                this.state.signName ='[ 姓名不能为空 ! ]';
                this.setState({});
            }
        }else{
            this.state.signName = '';
            this.setState({});
        }
    }
    //内容变化的时候修改值
    changeHandler(propname,value){
        this.props.teacherManager[propname] = value;
        this.setState({});
    }
    //点击保存
    save(){
        let justifyName = this.props.teacherManager.username;
        let justifyPhone = this.props.teacherManager.telephone;
        let justifyEmail = this.props.teacherManager.email;
        if(justifyName === ""){
            alert("姓名不能为空");
            return;
        }
        if(!(regPhone.test(justifyPhone))){
            alert("手机号码为空或者有误,请重新填写");
            return;
        }
        if(!(regEmail.test(justifyEmail))){
            alert("邮箱为空或者格式不正确,请重新填写");
            return;
        }
        this.props.dispatch({type:'teacherManager/myMessageSave',payload: {teacherManager:this.props.teacherManager}});
        // window.location.href = '/home/mine';
    }
    cancel(){
        window.location.href = '/home/revise';
    }
    render() {
        let {id , username,gender, birthDay, telephone, position, email, decManager, joinDate, address} = this.props.teacherManager;
        let {signName,signEmail,signPhone} = this.state;

        return (
            <React.Fragment>
                <div className="body teacher-list">

                    <ol className="breadcrumb">
                        <li className="active"><i className="fa fa-edit" />修改信息</li>
                    </ol>
                    <form className="form-horizontal" id="myMessage">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">id<i className = "fa fa-info-circle"/></label>
                            <div className="col-sm-10">
                                <p className="form-control-static">{id}</p>
                            </div>
                        </div>
                        <span id="judgeRight">{signName}</span>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">姓名<i className = "fa fa-id-badge"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control input-sm" value={username || ''} onChange={e=>this.changeHandler('username',e.target.value)} onBlur={e=>this.isNull('username',e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">性别<i className = "fa fa-male"/><i className = "fa fa-female"/></label>
                            <div className="col-sm-10">
                                <label className="radio-inline">
                                    <input
                                        type="radio" checked={gender===0} onChange={e=>this.changeHandler('gender',0) } /> 男
                                </label>
                                <label className="radio-inline">
                                    <input
                                        type="radio" checked={gender===1} onChange={e=>this.changeHandler('gender',1) } /> 女
                                </label>

                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">出生日期<i className = "fa fa-calendar"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="date" className="form-control input-sm" value={formatDate(birthDay) || ''} onChange={e=>this.changeHandler('birthDay',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">籍贯<i className = "fa fa-globe"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control input-sm" value={address || ''} onChange={e=>this.changeHandler('address',e.target.value)}/>
                            </div>
                        </div>
                        <span id="judgeRight">{signPhone}</span>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">电话<i className = "fa fa-mobile"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control input-sm" value={telephone ||''} onChange={e=>this.changeHandler('telephone',e.target.value)} onBlur={e=>this.isTrue('telephone',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">职位<i className = "fa fa-file-word-o"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control input-sm" value={position || ''} onChange={e=>this.changeHandler('position',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">入职时间<i className = "fa fa-calendar"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="date" className="form-control input-sm" value={formatDate(joinDate) || ''} onChange={e=>this.changeHandler('joinDate',e.target.value)}/>
                            </div>
                        </div>
                        <span id="judgeRight">{signEmail}</span>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email<i className = "fa fa-mail-forward"/></label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control input-sm" value={email || ''} onChange={e=>this.changeHandler('email',e.target.value)} onBlur={e=>this.isTrue('email',e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">描述<i className = "fa fa-file-text-o"/></label>
                            <div className="col-sm-10" >
                                <input
                                    type="text" className="form-control input-sm" value={decManager || ''} onChange={e=>this.changeHandler('decManager',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group-submit">
                            <div className="col-xs-7">
                                <a className="btn btn-success btn-sm pull-right" onClick={e=>this.save()}> 保 存 </a>
                                <a className="btn btn-success btn-sm pull-right" onClick={e=>this.cancel()}> 取 消 </a>
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
})(MyMessageEdit)