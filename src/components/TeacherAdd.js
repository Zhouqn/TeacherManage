import React,{Component} from 'react';
import { connect } from 'dva';

let regPhone = /^1[3456789]\d{9}$/;
let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

class  TeacherAdd  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signName:"",
            signEmail:"",
            signPhone:"",
            teacher:{
                // code:'',
                gender:0,
                joinDate:'',
                subject:'',
                username:'',
                nickname:'',
                birthDay:'',
                phone:'',
                email:'',
                address:'',
                decTeacher:'',
                // TeacherPhone:''
            },
        }
    }

    componentDidMount() {
        this.getSubjects();
    }

    //获取课程信息
    getSubjects() {
        this.props.dispatch({type:'subject/getSubjects',payload:{}});
    }

    //监听输入框值的改变
    changeHandler(propname,value){
        this.state.teacher[propname] = value;
        this.setState({});
    }
    //判断电话和邮箱正误
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
        if(propname === "phone"){
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
                this.state.signName ='[ 姓名不能为空! ]';
                this.setState({});
            }
        }else{
            this.state.signName = '';
            this.setState({});
        }
    }
    //保存
    save(){
        let justifyPhone = this.state.teacher.phone;
        let justifyEmail = this.state.teacher.email;
        let justifyName = this.state.teacher.username;
        if(justifyName === ""){
            alert("姓名不能为空");
            return;
        }
        if(!(regPhone.test(justifyPhone))){
            alert("手机号码有误，请重填");
            return;
        }
        if(!(regEmail.test(justifyEmail))){
            alert("邮箱格式不正确,请重新填写");
            return;
        }

        this.props.dispatch({type:'teacher/addTeacher',payload:{
                teacher:this.state.teacher,
            }})
    }
    //返回教师列表
    returnList(){
        window.location.href = '/home/list';
    }

    render() {
        const {subjects} = this.props;
        // const { code,gender,joinDate,subject,username,nickname,birthDay,phone,email,address,decTeacher,id } = this.state.teacher;
        const { gender,joinDate,subject,username,nickname,birthDay,phone,email,address,decTeacher } = this.state.teacher;
        const {signName,signEmail,signPhone} = this.state;

        return (
            <div className="body teacher">
                <ol className="breadcrumb">
                    <li className="active"><i className="fa fa-plus-square-o" />添加讲师</li>
                </ol>
                <div className="teacher-add">
                    <form action="" className="form-horizontal col-xs-offset-2">
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">姓名</label><span id='judgeRight'>{signName}</span>
                            <div className="col-xs-4">
                                <input
                                    type="text" className="form-control input-sm" value={username} onChange={e=>this.changeHandler('username',e.target.value)} onBlur={e=>this.isNull('username',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">花名</label>
                            <div className="col-xs-4">
                                <input
                                    type="text" className="form-control input-sm" value={nickname} onChange={e=>this.changeHandler('nickname',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">出生日期</label>
                            <div className="col-xs-4">
                                <input
                                    type="date" className="form-control input-sm" value={birthDay} onChange={e=>this.changeHandler('birthDay',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">入职时间</label>
                            <div className="col-xs-4">
                                <input
                                    type="date" className="form-control input-sm" value={joinDate} onChange={e=>this.changeHandler('joinDate',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">手机号码</label><span id='judgeRight'>{signPhone}</span>
                            <div className="col-xs-4">
                                <input
                                    type="text" className="form-control input-sm" value={phone} onChange={e=>this.changeHandler('phone',e.target.value)} onBlur={e=>this.isTrue('phone',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">邮箱</label><span id='judgeRight'>{signEmail}</span>
                            <div className="col-xs-4">
                                <input
                                    type="email" className="form-control input-sm" placeholder="例如:example@TeacherEail.com" value={email} onChange={e=>this.changeHandler('email',e.target.value)} onBlur={e=>this.isTrue('email',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">籍贯</label>
                            <div className="col-xs-4">
                                <input
                                    type="text" className="form-control input-sm" value={address} onChange={e=>this.changeHandler('address',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">描述</label>
                            <div className="col-xs-4">
                                <input
                                    type="text" className="form-control input-sm" value={decTeacher} onChange={e=>this.changeHandler('decTeacher',e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">所教科目</label>
                            <div className="col-xs-2">
                                <select value={subject} onChange={e=>this.changeHandler('subject',e.target.value)}
                                        name="" className="form-control input-sm">
                                    {
                                        subjects && subjects.map((subject,i)=>{
                                            return(
                                                <option key={i} value={subject.course}>{subject.course}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="col-xs-3 control-label">性别</label>
                            <div className="col-xs-4">
                                <label className="radio-inline">
                                    <input
                                        type="radio" checked={gender===0} onChange={e=>this.changeHandler('gender',0) }/> 男
                                </label>
                                <label className="radio-inline">
                                    <input
                                        type="radio" checked={gender===1} onChange={e=>this.changeHandler('gender',1) }  /> 女
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-7">
                                <a
                                    className="btn btn-success btn-sm pull-right" onClick={e=>this.save()}> 保 存 </a>
                                <a
                                    className="btn btn-success btn-sm pull-right" onClick={e=>this.returnList()}> 返 回 </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default connect(state=> {
        return {
            subjects: state.subject.subjects,
        }
    }
)(TeacherAdd);
