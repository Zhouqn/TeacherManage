import React,{Component} from "react";
import { connect } from 'dva';
import {serverHost,port} from "../config";
import {homeSubRouters,MyRoute as Route} from '../routers'
import TeacherLoading from "./common/TeacherLoading";
import CheckLogin from '../components/common/checkLogin'

class Home extends Component {
    constructor(props) {
        super(props);
        let tmp = window.sessionStorage.getItem('user') || '{"avatar":""}';
        let {avatar} = JSON.parse(tmp);
        this.state = {
            avatar:`${serverHost}:${port}${avatar}`,
        };
    }
    static defaultProps = {
        isLogin:true,
    };
    componentDidMount() {
       this.judgeLogin();
    }
    //判断是否登录
    judgeLogin(){
        this.props.dispatch({type:"teacher/judgeLogin",payload:{}});
    }
    //点击登录按钮
    goSignin(isLogin){
        if(isLogin){
            alert("您已登录,如果您要登录其他账号请先退出");
        }else{
            window.location.href = '/signin';
        }
    }
    //点击退出按钮
    signout(){
        this.props.dispatch({type:"teacher/signout",payload:{}})
    }
    //进入个人信息
    myMessage(){
        window.location.href = '/home/mine';
    }
    //进入编辑信息
    editMyMessage(){
        window.location.href = '/home/revise'
    }
    //进入教师管理
    teacherList(){
        window.location.href = '/home/list';
    }
    //进入课程信息
    courseMessage(){
        window.location.href = '/home/subject'
    }
    render(){
        let { avatar } = this.state;
        let { isLogin } = this.props;
        return (
            <React.Fragment>
                <div>
                    <div className="aside">

                        <div className="profile">

                            <div className="avatar img-circle">
                                <img src={avatar}/>
                            </div>
                            <h4></h4>
                        </div>
                        <div className="navs">
                            <ul className="list-unstyled">
                                <li>
                                    <a>
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                        <i className="fa fa-tasks"></i>
                                        导航栏
                                    </a>

                                </li>
                                <li>
                                    <a onClick={e=>this.myMessage()}>
                                        <i className="fa fa-user" ></i>
                                        个人中心
                                    </a>

                                </li>
                                <li>
                                    <a  onClick={e=>this.editMyMessage()}>
                                        <i className="fa fa-edit"></i>
                                        修改信息
                                    </a>
                                </li>
                                <li>
                                    <a onClick={e=>this.teacherList()}>
                                        <i className="fa fa-file-text-o" ></i>
                                        讲师管理
                                    </a>
                                </li>
                                <li>
                                    <a onClick={e=>this.courseMessage()}>
                                        <i className="fa fa-cog"></i>
                                        课程信息
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-cog"></i>
                                        系统设置
                                        <i className="arrow fa fa-angle-right"></i>
                                    </a>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a>
                                                网站设置
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                权限管理
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main">
                        <div className="container-fluid">

                            <div className="header">
                                <nav className="navbar navbar-custom">
                                    <div className="navbar-header">
                                        <a className="navbar-brand">
                                            <i className="fa fa-navicon"></i>
                                        </a>
                                    </div>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a >
                                                <i className="fa fa-bell"></i>
                                                <span className="badge">8</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={e=>this.myMessage()}>
                                                <i className="fa fa-user"></i>
                                                个人中心
                                            </a>
                                        </li>
                                        <li>
                                            <a  onClick={e=>this.goSignin(isLogin)}>
                                                <i className="fa fa-sign-in" ></i>
                                                登录
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={e=>this.signout()}>
                                                <i className="fa fa-sign-out" ></i>
                                                退出
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <TeacherLoading/>
                            {
                                homeSubRouters.map((route,i)=>{
                                    return <Route key={i} path={route.path} component={CheckLogin(route.component)}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(state=>{
        return{
            isLogin:state.teacher.isLogin,
        };
    }

)(Home);